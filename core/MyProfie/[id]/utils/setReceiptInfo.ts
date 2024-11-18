import { paymentInfo2, paymentInfo, appointment } from "../values"

export const setPaymentInfo = () => {
    paymentInfo.value.push(
        {
            title: 'Patient',
            info: `${appointment.value.patient.name} ${appointment.value.patient.surname}`
        },
        {
            title: 'Doctor',
            info: `${appointment.value.doctor.name} ${appointment.value.doctor.surname}`
        },
        {
            title: 'Provided service',
            info: `${appointment.value.type.name} :: ${appointment.value.category.title}`
        },
        {
            title: 'Date',
            info: appointment.value.date
        },
        {
            title: 'Time',
            info: appointment.value.startTime
        },
        {
            title: 'Duration in minutes',
            info: appointment.value.type.id === 1 ? '30' : '60'
        },
        {
            title: 'Provider',
            info: appointment.value.receipt.provider
        },
        {
            title: 'Location',
            info: appointment.value.room.address
        }
    )

    paymentInfo2.value.push(
        {
            title: 'Payment ID',
            info: appointment.value.receipt.id.toString()
        },
        {
            title: 'Timestamp',
            info: appointment.value.receipt.timestamp
        },
        {
            title: 'Method',
            info: appointment.value.receipt.method
        },
        {
            title: 'Amount',
            info: appointment.value.receipt.amount.toString()
        }
    )
}