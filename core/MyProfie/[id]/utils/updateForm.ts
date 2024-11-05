import { nextTick } from "vue";
import { formGroup, values } from "../values"

export const updateForm = () => {
    formGroup.value[0].fields[0].value = values.value.typeId
    formGroup.value[1].fields[0].value = new Date(values.value.date);
    formGroup.value[2].fields[0].value = values.value.startsAt;
    formGroup.value[2].fields[1].value = values.value.endsAt;


    nextTick(() => {
        formGroup.value[0].fields[0].value = values.value.typeId
        formGroup.value[1].fields[0].value = new Date(values.value.date);
        formGroup.value[2].fields[0].value = values.value.startsAt;
        formGroup.value[2].fields[1].value = values.value.endsAt;
    });
}