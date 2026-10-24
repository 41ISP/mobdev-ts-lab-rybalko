import { FormEvent, useState } from "react";
import { TCategory } from "../types";
import { todayISO } from "../format";
import { CATEGORY_LABELS, CATEGORY_LIST } from "../categories";
import { usePaymentsStore } from "../store";

export default function PaymentForm() {
    const [title, setTitle] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [due, setDue] = useState<string>(todayISO);
    const [category, setCategory] = useState<TCategory>("video");
    const [error, setError] = useState<string>("");

    const { addPayment } = usePaymentsStore();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const trimmedTitle = title.trim();
        const trimmedAmount = Number(amount.trim().replace(",", "."));

        if (!trimmedTitle) {
            setError("Название не может быть пустым");
            return;
        }

        if (!Number.isFinite(trimmedAmount) || trimmedAmount <= 0) {
            setError("Цена должна быть конечным положительным числом");
            return;
        }

        if (!due) {
            setError("Дата не заполнена");
            return;
        }

        addPayment({
            title: trimmedTitle,
            amount: trimmedAmount,
            due,
            category,
        });

        setTitle("");
        setAmount("");
        setError("");
    };

    return (
        <form className="box" onSubmit={handleSubmit}>
            <h2 className="h">Новая подписка</h2>

            <label className="field">
                <span>Название</span>
                <input
                    type="text"
                    placeholder="Например, Figma"
                    maxLength={60}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>

            <div className="two">
                <label className="field">
                    <span>Цена, ₽</span>
                    <input
                        type="text"
                        inputMode="decimal"
                        placeholder="0"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </label>
                <label className="field">
                    <span>Оплатить до</span>
                    <input
                        type="date"
                        value={due}
                        onChange={(e) => setDue(e.target.value)}
                    />
                </label>
            </div>

            <label className="field">
                <span>Категория</span>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as TCategory)}
                >
                    {CATEGORY_LIST.map((el, i) => (
                        <option value={el} key={i}>
                            {CATEGORY_LABELS[el]}
                        </option>
                    ))}
                </select>
            </label>

            {error && (
                <p className="error" role="alert">
                    {error}
                </p>
            )}

            <button className="btn" type="submit">
                Добавить
            </button>
        </form>
    );
}