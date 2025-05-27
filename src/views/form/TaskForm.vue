<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'vue-sonner';
import { ref } from 'vue'
import { useTaskFormStore } from '@/views/form/store/task-form.store.ts'
import { storeToRefs } from 'pinia'
import { useVuelidate } from '@vuelidate/core'

const store = useTaskFormStore();
const { form, processing, errors, rules } = storeToRefs(store);

const validator = useVuelidate(rules, form);

const userId = ref(1);


const onSubmit = (e: Event) => {
  e.preventDefault();

  form.value.user_id = userId.value;

  validator.value.$touch();

  if (!validator.value.$invalid) {
    store.submit()
      .then(() => {
        toast('Task created successfully');
        store.$reset();
      })
      .catch(() => {
        toast('Error creating task');
      });
  }

};
</script>

<template>
  <form class="w-2/3 space-y-6" @submit="onSubmit">
    <FormField name="todo" >
      <FormItem>
        <FormLabel>Todo</FormLabel>
        <FormControl>
          <Input type="text" placeholder="shadcn" v-model="form.todo" />
        </FormControl>
        {{ errors }}
        <div v-if="errors?.todo?.length" class="text-red-500">
          <ul>
            <li v-for="error in errors?.todo">
              {{ error }}
            </li>
          </ul>
        </div>
      </FormItem>
    </FormField>

    <FormField name="todo" >
      <FormItem>
        <div class="flex items-center">
          <Checkbox class="mr-2" v-model="form.completed"/>
          <FormLabel>Completed</FormLabel>
        </div>
      </FormItem>
    </FormField>

    <Button type="submit" :disabled="processing">
      Submit
    </Button>
  </form>
</template>
