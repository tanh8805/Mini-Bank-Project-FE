import DepositForm from "./transactions/DepositForm.jsx";
import TransferForm from "./transactions/TransferForm.jsx";
import WithdrawForm from "./transactions/WithdrawForm.jsx";

function ActionForms({ onBalanceUpdate, onHistoryUpdate }) {
  return (
    <section className="grid gap-6 lg:grid-cols-3">
      <DepositForm
        onBalanceUpdate={onBalanceUpdate}
        onHistoryUpdate={onHistoryUpdate}
      />
      <WithdrawForm
        onBalanceUpdate={onBalanceUpdate}
        onHistoryUpdate={onHistoryUpdate}
      />
      <TransferForm
        onBalanceUpdate={onBalanceUpdate}
        onHistoryUpdate={onHistoryUpdate}
      />
    </section>
  );
}

export default ActionForms;
