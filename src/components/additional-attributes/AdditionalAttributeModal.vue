<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title class="headline d-flex justify-space-between align-center">
        <span>{{ isUpdate ? 'Upravit další údaj' : 'Přidat další údaj' }}</span>
        <v-btn v-if="isUpdate" color="error" @click="deleteAdditionalAttribute" icon>
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" @submit.prevent="submitForm">
          <v-text-field
            v-model="localState.attributeName"
            label="Název atributu"
            :error-messages="v$.attributeName.$errors.map(e => e.$message)"
            @blur="v$.attributeName.$touch"
            required
          />
          <v-textarea
            v-model="localState.longText"
            label="Text"
            :error-messages="v$.longText.$errors.map(e => e.$message)"
            @blur="v$.longText.$touch"
            outlined
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
import { required, maxLength } from '@/utils/i18n-validators';
import { useSnackbar } from '@/composables/useSnackbar';
import { useI18n } from 'vue-i18n';
import { AdditionalAttributeService } from '@/services/AdditionalAttributeService';
import { useConfirm } from '@/composables/useConfirm';

const { showConfirm } = useConfirm();

const props = defineProps<{
  familyMemberId: string;
  additionalAttributeData?: { id: string; attributeName: string; longText: string } | null;
}>();

const emit = defineEmits(['additionalAttributeUpdated']);

const dialog = ref(false);

const localState = reactive({
  attributeName: '',
  longText: '',
  additionalAttributeId: ''
});

const isUpdate = computed(() => !!props.additionalAttributeData);

watch(
  () => props.additionalAttributeData,
  (newData) => {
    if (newData) {
      localState.attributeName = newData.attributeName;
      localState.longText = newData.longText;
      localState.additionalAttributeId = newData.id;
    } else {
      localState.attributeName = '';
      localState.longText = '';
      localState.additionalAttributeId = '';
    }
  },
  { immediate: true }
);

const rules = {
  attributeName: {
    required,
    maxLength: maxLength(150)
  },
  longText: {
    maxLength: maxLength(2000)
  }
};
const v$ = useVuelidate(rules, localState);
const { showSnackbar } = useSnackbar();
const { t } = useI18n();

const openDialog = () => {
  if (!props.additionalAttributeData) {
    localState.attributeName = '';
    localState.longText = '';
    localState.additionalAttributeId = '';
  }
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
  if (!isUpdate.value) {
    localState.attributeName = '';
    localState.longText = '';
    localState.additionalAttributeId = '';
  }
  v$.value.$reset();
};

const submitForm = async () => {
  const valid = await v$.value.$validate();
  if (!valid) return;

  let attributes;
  let relationships;

  if (isUpdate.value && localState.additionalAttributeId) {
    attributes = {
      'attribute-name': localState.attributeName,
      'long-text': localState.longText
    };
    relationships = {
      'family-member': {
        data: { type: 'family_members', id: props.familyMemberId }
      }
    };
  } else {
    attributes = {
      'attribute_name': localState.attributeName,
      'long_text': localState.longText
    };
    relationships = {
      family_member: {
        data: { type: 'family_members', id: props.familyMemberId }
      }
    };
  }

  const dataPayload: any = {
    type: 'additional_attributes',
    attributes,
    relationships
  };

  if (isUpdate.value && localState.additionalAttributeId) {
    dataPayload.id = localState.additionalAttributeId;
  }
  const payload = { data: dataPayload };

  try {
    if (isUpdate.value && localState.additionalAttributeId) {
      await AdditionalAttributeService.updateAdditionalAttribute(localState.additionalAttributeId, payload);
      showSnackbar(t('additional_attribute.alert.successUpdate'), 'success');
    } else {
      await AdditionalAttributeService.createAdditionalAttribute(payload);
      showSnackbar(t('additional_attribute.alert.successCreate'), 'success');
    }
    emit('additionalAttributeUpdated');
    closeDialog();
  } catch (err: any) {
    showSnackbar(t('additional_attribute.alert.error'), 'error');
  }
};

const deleteAdditionalAttribute = async () => {
  if (!localState.additionalAttributeId) return;

  const confirmed = await showConfirm({
    message: 'Opravdu chcete smazat tento údaj?',
    title: 'Smazání údaje',
    confirmText: t('general.delete'),
    cancelText: t('general.cancel')
  });

  if (!confirmed) {
    return;
  }

  try {
    await AdditionalAttributeService.deleteAdditionalAttribute(localState.additionalAttributeId);
    showSnackbar(t('additional_attribute.alert.successDelete'), 'success');
    emit('additionalAttributeUpdated');
    closeDialog();
  } catch (err: any) {
    showSnackbar(t('additional_attribute.alert.errorDelete'), 'error');
  }
};

defineExpose({ openDialog, closeDialog });
</script>

<style scoped>
</style>
