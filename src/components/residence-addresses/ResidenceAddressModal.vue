<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title class="headline d-flex justify-space-between align-center">
        <span>{{ isUpdate ? 'Upravit adresu pobytu' : 'Přidat adresu pobytu' }}</span>
        <v-btn v-if="isUpdate" color="error" @click="deleteResidenceAddress" icon>
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" @submit.prevent="submitForm">
          <v-text-field
            v-model="localState.address"
            label="Adresa"
            :error-messages="v$.address.$errors.map(e => e.$message)"
            @blur="v$.address.$touch"
            required
          />
          <v-text-field
            v-model="localState.period"
            label="Období"
            :error-messages="v$.period.$errors.map(e => e.$message)"
            @blur="v$.period.$touch"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="submitForm">
          {{ isUpdate ? 'Upravit' : 'Vytvořit' }}
        </v-btn>
        <v-btn text @click="closeDialog">Zrušit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useSnackbar } from '@/composables/useSnackbar';
import { useI18n } from 'vue-i18n';
import { ResidenceAddressService } from '@/services/ResidenceAddressService';

const props = defineProps<{
  familyMemberId: string;
  residenceAddressData?: { id: string; address: string; period: string } | null;
}>();

const emit = defineEmits(['residenceAddressUpdated']);

const dialog = ref(false);

const localState = reactive({
  address: '',
  period: '',
  residenceAddressId: ''
});

const isUpdate = computed(() => !!props.residenceAddressData);

watch(
  () => props.residenceAddressData,
  (newData) => {
    if (newData) {
      localState.address = newData.address;
      localState.period = newData.period;
      localState.residenceAddressId = newData.id;
    } else {
      localState.address = '';
      localState.period = '';
      localState.residenceAddressId = '';
    }
  },
  { immediate: true }
);

const rules = {
  address: { required },
  period: {}
};
const v$ = useVuelidate(rules, localState);
const { showSnackbar } = useSnackbar();
const { t } = useI18n();

const openDialog = () => {
  if (!props.residenceAddressData) {
    localState.address = '';
    localState.period = '';
    localState.residenceAddressId = '';
  }
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
  if (!isUpdate.value) {
    localState.address = '';
    localState.period = '';
    localState.residenceAddressId = '';
  }
  v$.value.$reset();
};

const submitForm = async () => {
  const valid = await v$.value.$validate();
  if (!valid) return;

  const relationships =
    isUpdate.value && localState.residenceAddressId
      ? {
        'family-member': {
          data: { type: 'family_members', id: props.familyMemberId }
        }
      }
      : {
        family_member: {
          data: { type: 'family_members', id: props.familyMemberId }
        }
      };

  const dataPayload: any = {
    type: 'residence_addresses',
    attributes: {
      address: localState.address,
      period: localState.period
    },
    relationships
  };

  if (isUpdate.value && localState.residenceAddressId) {
    dataPayload.id = localState.residenceAddressId;
  }
  const payload = { data: dataPayload };

  try {
    if (isUpdate.value && localState.residenceAddressId) {
      await ResidenceAddressService.updateResidenceAddress(localState.residenceAddressId, payload);
      showSnackbar(t('residence_address.alert.successUpdate'), 'success');
    } else {
      await ResidenceAddressService.createResidenceAddress(payload);
      showSnackbar(t('residence_address.alert.successCreate'), 'success');
    }
    emit('residenceAddressUpdated');
    closeDialog();
  } catch (err: any) {
    showSnackbar(t('residence_address.alert.error'), 'error');
  }
};

const deleteResidenceAddress = async () => {
  if (!localState.residenceAddressId) return;
  try {
    await ResidenceAddressService.deleteResidenceAddress(localState.residenceAddressId);
    showSnackbar(t('residence_address.alert.successDelete'), 'success');
    emit('residenceAddressUpdated');
    closeDialog();
  } catch (err: any) {
    showSnackbar(t('residence_address.alert.errorDelete'), 'error');
  }
};

defineExpose({ openDialog, closeDialog });
</script>

<style scoped>
</style>
