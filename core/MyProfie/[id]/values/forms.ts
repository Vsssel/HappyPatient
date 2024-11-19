import type { FormGroup } from "~/shared/components/form/types"
import { values, disabled } from "./refs"

export const formGroup = ref<FormGroup[]>([
    {
        class: 'd-flex w-100',
        fields: [
            {
                name: 'typeId',
                type: 'select',
                label: { text: "Appointment type" },
                required: true,
                class: 'col-12',
                options: [{ label: 'Visit', value: 1 }, { label: 'Treatment', value: 2 }],
                value: values.value.typeId,
                disabled: disabled.value
            }
        ]
    },
    {
        class: 'd-flex w-100',
        fields: [
            {
                name: 'date',
                type: 'date',
                label: { text: "Date" },
                required: true,
                class: 'col-12 mt-2',
                value: values.value.date,
                showIcon: true,
                minDate: new Date(),
                maxDate: new Date(new Date().getTime() + 3 * 7 * 24 * 60 * 60 * 1000),
                dateFormat: 'dd.mm.yy',
                disabled: disabled.value
            }
        ]
    },
    {
        class: 'row w-100 mt-2',
        fields: [
            {
                name: 'startsAt',
                type: 'date',
                label: { text: "Start Time" },
                required: true,
                class: 'col-6 ps-0',
                stepMinute: 30,
                value: values.value.startsAt,
                showIcon: true,
                timeOnly: true,
                dateFormat: 'HH:mm',
                disabled: disabled.value
            },
            {
                name: 'endsAt',
                type: 'date',
                label: { text: "End Time" },
                required: true,
                class: 'col-6 pe-0',
                stepMinute: 30,
                value: values.value.endsAt,
                showIcon: true,
                timeOnly: true,
                dateFormat: 'HH:mm',
                disabled: disabled.value
            }
        ]
    }
])
