import { defineStore } from 'pinia'
import { minLength, required } from '@vuelidate/validators'
import axios from 'axios'

interface FormContract {
  todo: string;
  completed: boolean;
  user_id: number;
}

interface TaskFormStoreContract {
  form: FormContract,
  errors: object,
  processing: boolean,
}

export const useTaskFormStore = defineStore('task-form.store', {
  state: (): TaskFormStoreContract => ({
    form: {
      todo: '',
      completed: false,
      userId: 0,
    },
    errors: {},
    processing: false,
  }),
  getters: {
    rules: () => ({
      todo: {
        required,
        minLength: minLength(2),
      },
      userId: {
        required,
      }
    })
  },
  actions: {

    async submit(): Promise<void> {
      this.processing = true;

      return new Promise(async (resolve, reject) => {
        try {
          await axios.post('http://localhost:8000/api/todos', this.form);
          return resolve();
        } catch (error: any) {
          this.errors = error.response.data.errors;
          return reject();
        } finally {
          this.processing = false;
        }
      })
    }
  },
});
