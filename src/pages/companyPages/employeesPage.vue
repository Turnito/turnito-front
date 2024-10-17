<template>
  <div class="p-6 w-full">
    <SpecialityManagementComponent />
    <ProfessionalFormContainer />
    <ProfessionalListComponent />
  </div>
</template>

<script setup>
import ProfessionalFormContainer from '@/components/employees/professionalFormContainer.vue'
import ProfessionalListComponent from '@/components/employees/professionalListComponent.vue'
import SpecialityManagementComponent from '@/components/employees/specialityManagementComponent.vue'
</script>
