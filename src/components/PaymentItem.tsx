import { dateParts, formatMoney } from "../format"
import { IPayment } from "../types"
import { CATEGORY_LABELS } from "../categories"
import { usePaymentsStore } from "../store"

interface IPaymentItemProps {
    payment: IPayment
}

export default function PaymentItem({ payment }: IPaymentItemProps) {
    const { togglePaid, removePayment } = usePaymentsStore()
    const { day, month } = dateParts(payment.due)

    return (
        <li className={payment.paid ? "item paid" : "item"}>
            <div className="main">
                <time className="date" dateTime={payment.due}>
                    <b>{day}</b>
                    {month}
                </time>
                <div className="info">
                    <span className="name">{payment.title}</span>
                    <span className={`tag ${payment.category}`}>
                        {CATEGORY_LABELS[payment.category]}
                    </span>
                </div>
                <span className="price">{formatMoney(payment.amount)}</span>
            </div>
            <div className="bar">
                <label className="check">
                    <input 
                        type="checkbox" 
                        checked={payment.paid}
                        onChange={() => togglePaid(payment.id)}
                    />
                    Оплачено
                </label>
                <button 
                    className="del" 
                    type="button"
                    onClick={() => removePayment(payment.id)}
                >
                    Удалить
                </button>
            </div>
        </li>
    )
}