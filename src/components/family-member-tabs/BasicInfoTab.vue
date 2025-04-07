<template>
  <v-card flat>
    <v-card-text>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <v-card class="mb-4" outlined>
              <v-card-title class="text-h5 font-bold bg-red-200">{{ $t('family.personalDetails') }}</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="6">
                    <div><strong>{{ $t('family.label.firstName') }}:</strong> {{ member.firstName }}</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div><strong>{{ $t('family.label.lastName') }}:</strong> {{ member.lastName }}</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div><strong>{{ $t('family.label.birthLastName') }}:</strong> {{ member.birthLastName }}</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div><strong>{{ $t('family.label.dateOfBirth') }}:</strong> {{ formatDate(member.dateOfBirth) }}</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div><strong>{{ $t('family.label.birthPlace') }}:</strong> {{ member.birthPlace }}</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div><strong>{{ $t('family.label.birthTime') }}:</strong> {{ formatTime(member.birthTime) }}</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div>
                      <strong>{{ $t('family.label.gender') }}:</strong> {{ translateGender(member.gender) }}
                    </div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div><strong>{{ $t('family.label.religion') }}:</strong> {{ member.religion }}</div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row v-if="member.deceased">
          <v-col cols="12">
            <v-card class="mb-4" outlined>
              <v-card-title class="text-h5 font-bold bg-red-200">{{ $t('family.section.deathInfo') }}</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="6">
                    <div><strong>{{ $t('family.label.dateOfDeath') }}:</strong> {{ formatDate(member.dateOfDeath) }}</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div><strong>{{ $t('family.label.deathTime') }}:</strong> {{ formatTime(member.deathTime) }}</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div><strong>{{ $t('family.label.deathPlace') }}:</strong> {{ member.deathPlace }}</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div><strong>{{ $t('family.label.causeOfDeath') }}:</strong> {{ member.causeOfDeath }}</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div><strong>{{ $t('family.label.burialDate') }}:</strong> {{ formatDate(member.burialDate) }}</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div><strong>{{ $t('family.label.burialPlace') }}:</strong> {{ member.burialPlace }}</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div><strong>{{ $t('family.label.internmentPlace') }}:</strong> {{ member.internmentPlace }}</div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-card class="mb-4" outlined>
              <v-card-title class="text-h5 font-bold bg-red-200">{{ $t('family.relatives') }}</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-list dense>
                  <v-list-item
                    v-for="relationship in member.relationShipTree"
                    :key="relationship.id"
                  >
                    <v-list-item-content>
                      <router-link :to="`/family-member-detail/${relationship.id}`" class="hover:text-red-500">
                        {{ relationship.firstName }} {{ relationship.lastName }} ({{ relationship.relationship }})
                      </router-link>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-card class="mb-4" outlined>
              <v-card-title class="text-h5 font-bold bg-red-200">
                <div class="flex items-center w-full">
                  <span>{{ $t('marriage.title') }}</span>
                  <v-btn icon class="ml-4" @click="onAddMarriage" size="35">
                    <v-icon size="23">mdi-plus</v-icon>
                  </v-btn>
                </div>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-list dense>
                  <v-list-item
                    v-for="marriage in member.marriageDetails"
                    :key="marriage.id"
                    class="d-flex align-center"
                  >
                    <v-list-item-content>
                      <div class="flex items-center justify-between w-full pr-2">
                        <div>
                          <div>
                            <strong>{{ $t('marriage.partnerLabel') }}: </strong>
                            <router-link :to="`/family-member-detail/${marriage.partnerId}`" class="hover:text-red-500">
                              {{ marriage.firstName }} {{ marriage.lastName }}
                            </router-link>
                          </div>
                          <div>
                            <strong>{{ $t('marriage.periodLabel') }}:</strong> {{ marriage.period }}
                          </div>
                        </div>
                        <v-btn icon class="ml-4" @click="onEditMarriage(marriage)" size="35">
                          <v-icon size="18">mdi-pencil</v-icon>
                        </v-btn>
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <MarriageModal
          ref="marriageModal"
          :firstPartnerId="member.id"
          :marriageData="selectedMarriage"
          @marriageUpdated="onMarriageUpdated"
        />

        <v-row>
          <v-col cols="12">
            <v-card class="mb-4" outlined>
              <v-card-title class="text-h5 font-bold bg-red-200">
                <div class="flex items-center w-full">
                  <span>{{ $t('education.title') }}</span>
                  <v-btn icon class="ml-4" @click="onAddEducation" size="35">
                    <v-icon size="23">mdi-plus</v-icon>
                  </v-btn>
                </div>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-list dense>
                  <v-list-item
                    v-for="education in member.educationDetails"
                    :key="education.id"
                    class="d-flex align-center"
                  >
                    <v-list-item-content>
                      <div class="flex items-center justify-between w-full pr-2">
                        <div>
                          <div>
                            <strong>{{ $t('education.field.schoolName') }}:</strong> {{ education.schoolName }}
                          </div>
                          <div>
                            <strong>{{ $t('education.field.address') }}:</strong> {{ education.address }}
                          </div>
                          <div>
                            <strong>{{ $t('education.field.period') }}:</strong> {{ education.period }}
                          </div>
                        </div>
                        <v-btn icon class="ml-4" @click="onEditEducation(education)" size="35">
                          <v-icon size="18">mdi-pencil</v-icon>
                        </v-btn>
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <EducationModal
          ref="educationModal"
          :familyMemberId="member.id"
          :educationData="selectedEducation"
          @educationUpdated="onEducationUpdated"
        />

        <v-row>
          <v-col cols="12">
            <v-card class="mb-4" outlined>
              <v-card-title class="text-h5 font-bold bg-red-200">
                <div class="flex items-center w-full">
                  <span>{{ $t('employment.title') }}</span>
                  <v-btn icon class="ml-4" @click="onAddEmployment" size="35">
                    <v-icon size="23">mdi-plus</v-icon>
                  </v-btn>
                </div>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-list dense>
                  <v-list-item
                    v-for="employment in member.employmentDetails"
                    :key="employment.id"
                    class="d-flex align-center"
                  >
                    <v-list-item-content>
                      <div class="flex items-center justify-between w-full pr-2">
                        <div>
                          <div>
                            <strong>{{ $t('employment.employerLabel') }}:</strong> {{ employment.employer }}
                          </div>
                          <div>
                            <strong>{{ $t('employment.addressLabel') }}:</strong> {{ employment.address }}
                          </div>
                          <div>
                            <strong>{{ $t('employment.periodLabel') }}:</strong> {{ employment.period }}
                          </div>
                        </div>
                        <v-btn icon class="ml-4" @click="onEditEmployment(employment)" size="35">
                          <v-icon size="18">mdi-pencil</v-icon>
                        </v-btn>
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item class="d-flex align-center">
                    <v-list-item-content>
                      <div class="flex items-center justify-between w-full pr-2">
                        <div>
                          <div>
                            <strong>{{ $t('employment.profession') }}:</strong> {{ member.profession }}
                          </div>
                        </div>
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <EmploymentModal
          ref="employmentModal"
          :familyMemberId="member.id"
          :employmentData="selectedEmployment"
          @employmentUpdated="onEmploymentUpdated"
        />

        <v-row>
          <v-col cols="12">
            <v-card class="mb-4" outlined>
              <v-card-title class="text-h5 font-bold bg-red-200">
                <div class="flex items-center w-full">
                  <span>{{ $t('residence.title') }}</span>
                  <v-btn icon class="ml-4" @click="onAddResidenceAddress" size="35">
                    <v-icon size="23">mdi-plus</v-icon>
                  </v-btn>
                </div>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-list dense>
                  <v-list-item
                    v-for="residence in member.residenceAddressDetails"
                    :key="residence.id"
                    class="d-flex align-center"
                  >
                    <v-list-item-content>
                      <div class="flex items-center justify-between w-full pr-2">
                        <div>
                          <div>
                            <strong>{{ $t('residence.addressLabel') }}:</strong> {{ residence.address }}
                          </div>
                          <div>
                            <strong>{{ $t('residence.periodLabel') }}:</strong> {{ residence.period }}
                          </div>
                        </div>
                        <v-btn icon class="ml-4" @click="onEditResidenceAddress(residence)" size="35">
                          <v-icon size="18">mdi-pencil</v-icon>
                        </v-btn>
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <ResidenceAddressModal
          ref="residenceAddressModal"
          :familyMemberId="member.id"
          :residenceAddressData="selectedResidenceAddress"
          @residenceAddressUpdated="onResidenceAddressUpdated"
        />

        <v-row>
          <v-col cols="12">
            <v-card class="mb-4" outlined>
              <v-card-title class="text-h5 font-bold bg-red-200">{{ $t('family.hobbiesTitle') }}</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <p>{{member.hobbiesAndInterests}}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-card class="mb-4" outlined>
              <v-card-title class="text-h5 font-bold bg-red-200">{{ $t('family.shortMessageTitle') }}</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <p>{{member.shortMessage}}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-card class="mb-4" outlined>
              <v-card-title class="text-h5 font-bold bg-red-200">
                <div class="flex items-center w-full">
                  <span>{{ $t('signature.label') }}</span>
                  <v-btn icon class="ml-4" @click="openSignatureModal" size="35">
                    <v-icon size="23">mdi-image-edit</v-icon>
                  </v-btn>
                </div>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text class="flex">
                <v-img v-if="member.signatureUrl" :src="BACKEND_URL + member.signatureUrl" max-width="200" :alt="$t('signature.label')" />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-card class="mb-4" outlined>
              <v-card-title class="text-h5 font-bold bg-red-200">
                <div class="flex items-center w-full">
                  <span>{{ $t('additional_attribute.label') }}</span>
                  <v-btn icon class="ml-4" @click="onAddAdditionalAttribute" size="35">
                    <v-icon size="23">mdi-plus</v-icon>
                  </v-btn>
                </div>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-list dense>
                  <v-list-item
                    v-for="additionalAttribute in member.additionalAttributeDetails"
                    :key="additionalAttribute.id"
                    class="d-flex align-center"
                  >
                    <v-list-item-content>
                      <div class="flex items-center justify-between w-full pr-2">
                        <div>
                          <div>
                            <strong>{{ additionalAttribute.attributeName }}</strong>
                          </div>
                          <div>
                            {{ additionalAttribute.longText }}
                          </div>
                        </div>
                        <v-btn icon class="ml-4" @click="onEditAdditionalAttribute(additionalAttribute)" size="35">
                          <v-icon size="18">mdi-pencil</v-icon>
                        </v-btn>
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <AdditionalAttributeModal
          ref="additionalAttributeModal"
          :familyMemberId="member.id"
          :additionalAttributeData="selectedAdditionalAttribute"
          @additionalAttributeUpdated="onAdditionalAttributeUpdated"
        />

        <FamilyMemberSignatureUpdateModal
          ref="signatureModal"
          :memberId="member.id"
          :currentSignatureUrl="member.signatureUrl"
          @signatureUpdated="onSignatureUpdated"
        />
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { FamilyMember } from '@/interfaces/familyMembers.ts'
import { useI18n } from 'vue-i18n'
import MarriageModal from '@/components/marriages/MarriageModal.vue'
import { useFamilyMembersStore } from '@/stores/familyMemberStore.ts'
import EducationModal from '@/components/educations/EducationModal.vue'
import EmploymentModal from '@/components/employments/EmploymentModal.vue'
import ResidenceAddressModal from '@/components/residence-addresses/ResidenceAddressModal.vue'
import AdditionalAttributeModal from '@/components/additional-attributes/AdditionalAttributeModal.vue'
import { BACKEND_URL } from '@/env-constants.ts'
import FamilyMemberSignatureUpdateModal
  from '@/components/family-member/FamilyMemberSignatureUpdateModal.vue'

const signatureModal = ref<any>(null);

const openSignatureModal = () => {
  signatureModal.value.openDialog();
};

const onSignatureUpdated = async () => {
  await familyStore.fetchFamilyMember(props.member.id);
};

const marriageModal = ref<any>(null);
const educationModal = ref<any>(null);
const familyStore = useFamilyMembersStore();
const employmentModal = ref<any>(null);
const residenceAddressModal = ref<any>(null);
const additionalAttributeModal = ref<any>(null);

const selectedMarriage = ref<null | { id: string; period: string; partnerId: string }>(null);
const selectedEducation = ref<null | { id: string; schoolName: string; address: string; period: string }>(null);
const selectedEmployment = ref<null | { id: string; employer: string; address: string; period: string }>(null);
const selectedResidenceAddress = ref<null | { id: string; address: string; period: string }>(null);
const selectedAdditionalAttribute = ref<null | { id: string; attributeName: string; longText: string }>(null);

const onAddAdditionalAttribute = () => {
  selectedAdditionalAttribute.value = null;
  additionalAttributeModal.value.openDialog();
};

const onEditAdditionalAttribute = (residence: any) => {
  selectedAdditionalAttribute.value = residence;
  additionalAttributeModal.value.openDialog();
};

const onAdditionalAttributeUpdated = async () => {
  await familyStore.fetchFamilyMember(props.member.id);
};

const onAddResidenceAddress = () => {
  selectedResidenceAddress.value = null;
  residenceAddressModal.value.openDialog();
};

const onEditResidenceAddress = (residence: any) => {
  selectedResidenceAddress.value = residence;
  residenceAddressModal.value.openDialog();
};

const onResidenceAddressUpdated = async () => {
  await familyStore.fetchFamilyMember(props.member.id);
};

const onAddEmployment = () => {
  selectedEmployment.value = null;
  employmentModal.value.openDialog();
};

const onEditEmployment = (employment: any) => {
  selectedEmployment.value = employment;
  employmentModal.value.openDialog();
};

const onEmploymentUpdated = async () => {
  await familyStore.fetchFamilyMember(props.member.id);
};

const onAddEducation = () => {
  selectedEducation.value = null;
  educationModal.value.openDialog();
};

const onEditEducation = (education: any) => {
  selectedEducation.value = education;
  educationModal.value.openDialog();
};

const onEducationUpdated = async () => {
  await familyStore.fetchFamilyMember(props.member.id);
};

const onAddMarriage = () => {
  selectedMarriage.value = null;
  marriageModal.value.openDialog();
};

const onEditMarriage = (marriage: any) => {
  selectedMarriage.value = marriage;
  marriageModal.value.openDialog();
};


const onMarriageUpdated = async () => {
  await familyStore.fetchFamilyMember(props.member.id);
};

const props = defineProps<{
  member: FamilyMember;
}>();

const { t, locale } = useI18n();

function formatDate(date: string): string {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString(locale.value);
}

function formatTime(time: string): string {
  if (!time) return '';
  const d = new Date(time);
  if (isNaN(d.getTime())) return time;
  const hours = String(d.getUTCHours()).padStart(2, '0');
  const minutes = String(d.getUTCMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

function translateGender(gender: string): string {
  if (!gender) return '';
  switch (gender) {
    case 'male':
      return t('family.gender.male');
    case 'female':
      return t('family.gender.female');
    case 'other':
      return t('family.gender.other');
    default:
      return gender;
  }
}
</script>

<style scoped>
</style>
