import React, { useState, useEffect } from 'react';

interface OrderStatusProps {
  trackingCode: string;
}

interface ImportStatus {
  status: string;
  paymentDue: boolean;
  deadline: string;
}

const OrderStatus: React.FC<OrderStatusProps> = ({ trackingCode }) => {
  const [importStatus, setImportStatus] = useState<ImportStatus | null>(null);

  useEffect(() => {
    // Simulação de chamada a uma API para obter o status da encomenda
    const fetchImportStatus = async () => {
      const response = await fetch(`/api/getImportStatus?trackingCode=${trackingCode}`);
      const data = await response.json();
      setImportStatus(data);
    };

    fetchImportStatus();
  }, [trackingCode]);

  if (!importStatus) {
    return <p>Carregando status da encomenda...</p>;
  }

  return (
    <div>
      <h3>Status da Encomenda</h3>
      <p>Status: {importStatus.status}</p>
      {importStatus.paymentDue && (
        <p>Há taxas pendentes. Pague até: {importStatus.deadline}</p>
      )}
      {!importStatus.paymentDue && <p>Não há taxas pendentes.</p>}
    </div>
  );
};

export default OrderStatus;
