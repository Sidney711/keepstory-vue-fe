<template>
  <v-card flat>
    <v-card-text>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <v-card class="mb-4" outlined>
              <v-card-title class="text-h5 font-bold">Osobní údaje</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="6">
                    <div><strong>Jméno:</strong> {{member.firstName}}</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div><strong>Příjmení:</strong> {{member.lastName}}</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div><strong>Rodné příjmení:</strong> {{member.birthLastName}}</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div><strong>Datum narození:</strong> {{formatDate(member.dateOfBirth)}}</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div><strong>Místo narození:</strong> {{member.birthPlace}}</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div><strong>Čas narození:</strong> {{ formatTime(member.birthTime) }}</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div><strong>Pohlaví:</strong> {{member.gender}}</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div><strong>Náboženství:</strong> {{member.religion}}</div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row v-if="member.deceased">
          <v-col cols="12">
            <v-card class="mb-4" outlined>
              <v-card-title class="text-h5 font-bold">Informace o úmrtí</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="6">
                    <div><strong>Datum úmrtí:</strong> {{formatDate(member.dateOfDeath)}}</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div><strong>Čas úmrtí:</strong> {{formatTime(member.deathTime)}}</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div><strong>Místo úmrtí:</strong> {{member.deathPlace}}</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div><strong>Příčina smrti:</strong> {{member.causeOfDeath}}</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div><strong>Datum pohřbu:</strong> {{formatDate(member.burialDate)}}</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div><strong>Místo pohřbu:</strong> {{member.burialPlace}}</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div><strong>Místo pochování:</strong> {{member.intermentPlace}}</div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-card class="mb-4" outlined>
              <v-card-title class="text-h5 font-bold">Příbuzní</v-card-title>
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
              <v-card-title class="text-h5 font-bold">
                <div class="flex items-center w-full">
                  <span>Manželství</span>
                  <v-btn icon class="ml-4" @click="onAddMarriage" size="35">
                    <v-icon size="23">mdi-plus</v-icon>
                  </v-btn>
                </div>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-list dense>
                  <v-list-item class="d-flex align-center">
                    <v-list-item-content>
                      <div class="flex items-center justify-between w-full pr-2">
                        <div>
                          <div><strong>Partner:</strong> Eva Nováková</div>
                          <div><strong>Datum sňatku:</strong> 12.06.2010</div>
                          <div><strong>Rozvod:</strong> 2018</div>
                        </div>
                        <v-btn icon class="ml-4" @click="onEditMarriage" size="35">
                          <v-icon size="18">mdi-pencil</v-icon>
                        </v-btn>
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item class="d-flex align-center">
                    <v-list-item-content>
                      <div class="flex items-center justify-between w-full pr-2">
                        <div>
                          <div><strong>Partner:</strong> Eva Nováková</div>
                          <div><strong>Datum sňatku:</strong> 12.06.2010</div>
                          <div><strong>Rozvod:</strong> 2018</div>
                        </div>
                        <v-btn icon class="ml-4" @click="onEditMarriage" size="35">
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

        <v-row>
          <v-col cols="12">
            <v-card class="mb-4" outlined>
              <v-card-title class="text-h5 font-bold">
                <div class="flex items-center w-full">
                  <span>Vzdělání</span>
                  <v-btn icon class="ml-4" @click="onAddEducation" size="35">
                    <v-icon size="23">mdi-plus</v-icon>
                  </v-btn>
                </div>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-list dense>
                  <v-list-item class="d-flex align-center">
                    <v-list-item-content>
                      <div class="flex items-center justify-between w-full pr-2">
                        <div>
                          <div><strong>Název:</strong> Základní škola Květen</div>
                          <div><strong>Adresa:</strong> Ulice 1, Praha</div>
                          <div><strong>Období:</strong> 1996 – 2002</div>
                        </div>
                        <v-btn icon class="ml-4" @click="onEditEducation" size="35">
                          <v-icon size="18">mdi-pencil</v-icon>
                        </v-btn>
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item class="d-flex align-center">
                    <v-list-item-content>
                      <div class="flex items-center justify-between w-full pr-2">
                        <div>
                          <div><strong>Název:</strong> Gymnázium Slunce</div>
                          <div><strong>Adresa:</strong> Ulice 2, Brno</div>
                          <div><strong>Období:</strong> 2002 – 2006</div>
                        </div>
                        <v-btn icon class="ml-4" @click="onEditEducation" size="35">
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

        <v-row>
          <v-col cols="12">
            <v-card class="mb-4" outlined>
              <v-card-title class="text-h5 font-bold">
                <div class="flex items-center w-full">
                  <span>Zaměstnání a profese</span>
                  <v-btn icon class="ml-4" @click="onAddEmployment" size="35">
                    <v-icon size="23">mdi-plus</v-icon>
                  </v-btn>
                </div>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-list dense>
                  <v-list-item class="d-flex align-center">
                    <v-list-item-content>
                      <div class="flex items-center justify-between w-full pr-2">
                        <div>
                          <div><strong>Název společnosti:</strong> IT Solutions</div>
                          <div><strong>Adresa:</strong> Tech Park, Praha</div>
                          <div><strong>Období:</strong> 2008 – 2015</div>
                        </div>
                        <v-btn icon class="ml-4" @click="onEditEmployment" size="35">
                          <v-icon size="18">mdi-pencil</v-icon>
                        </v-btn>
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item class="d-flex align-center">
                    <v-list-item-content>
                      <div class="flex items-center justify-between w-full pr-2">
                        <div>
                          <div><strong>Název společnosti:</strong> Web Innovators</div>
                          <div><strong>Adresa:</strong> Centrum, Brno</div>
                          <div><strong>Období:</strong> 2015 – současnost</div>
                        </div>
                        <v-btn icon class="ml-4" @click="onEditEmployment" size="35">
                          <v-icon size="18">mdi-pencil</v-icon>
                        </v-btn>
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item class="d-flex align-center">
                    <v-list-item-content>
                      <div class="flex items-center justify-between w-full pr-2">
                        <div>
                          <div><strong>Profese:</strong> Programátor, IT konzultant</div>
                        </div>
                      </div>
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
              <v-card-title class="text-h5 font-bold">
                <div class="flex items-center w-full">
                  <span>Adresy pobytu</span>
                  <v-btn icon class="ml-4" @click="onAddAddress" size="35">
                    <v-icon size="23">mdi-plus</v-icon>
                  </v-btn>
                </div>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-list dense>
                  <v-list-item class="d-flex align-center">
                    <v-list-item-content>
                      <div class="flex items-center justify-between w-full pr-2 py-2">
                        <div>Praha, Česká republika</div>
                        <v-btn icon class="ml-4" @click="onEditAddress" size="35">
                          <v-icon size="18">mdi-pencil</v-icon>
                        </v-btn>
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item class="d-flex align-center">
                    <v-list-item-content>
                      <div class="flex items-center justify-between w-full pr-2 py-2">
                        <div>Brno, Česká republika</div>
                        <v-btn icon class="ml-4" @click="onEditAddress" size="35">
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

        <v-row>
          <v-col cols="12">
            <v-card class="mb-4" outlined>
              <v-card-title class="text-h5 font-bold">Koníčky a zájmy</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <p>Čtení, sport, hudba, cestování</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-card class="mb-4" outlined>
              <v-card-title class="text-h5 font-bold">Krátký popis osoby</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <p>
                  Jan je charismatická osobnost s bohatou historií, která zanechala stopu ve všech oblastech svého života.
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-card class="mb-4" outlined>
              <v-card-title class="text-h5 font-bold">Krátký vzkaz</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <p>Tady je krátký vzkaz, který vyjadřuje životní filozofii.</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-card class="mb-4" outlined>
              <v-card-title class="text-h5 font-bold">Podpis</v-card-title>
              <v-divider></v-divider>
              <v-card-text class="flex justify-center">
                <v-img src="https://example.com/signature.png" max-width="200" />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-card class="mb-4" outlined>
              <v-card-title class="text-h5 font-bold">Další údaje</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <p>
                  Zde mohou být libovolné údaje, které si uživatel sám vytvořil při vytváření osoby.
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

      </v-container>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { FamilyMember } from '@/interfaces/familyMembers.ts'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  member: FamilyMember;
}>();

const onAddMarriage = () => {
  console.log('Add marriage');
};

const onEditMarriage = () => {
  console.log('Edit marriage');
};

const onAddEducation = () => {
  console.log('Add education');
};

const onEditEducation = () => {
  console.log('Edit education');
};

const onAddEmployment = () => {
  console.log('Add employment');
};

const onEditEmployment = () => {
  console.log('Edit employment');
};

const onAddAddress = () => {
  console.log('Add address');
};

const onEditAddress = () => {
  console.log('Edit address');
};

const { locale } = useI18n();

function formatDate(date: string): string {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString(locale.value);
}

function formatTime(time: string): string {
  if (!time) return '';
  const d = new Date(time);
  if (isNaN(d.getTime())) return time;
  return d.toLocaleTimeString(locale.value, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}
</script>

<style scoped>
</style>
