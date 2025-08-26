export const exportToCSV = (data, filename) => {
  if (!data || data.length === 0) {
    throw new Error('No data to export');
  }

  const headers = ['Symbol', 'Name', 'Price (₹)', 'Change (₹)', 'Change (%)', 'Volume', 'Market Cap (₹Cr)'];
  
  const csvContent = [
    headers.join(','),
    ...data.map(stock => [
      stock.symbol,
      `"${stock.name}"`,
      stock.price.toFixed(2),
      stock.change.toFixed(2),
      stock.changePercent.toFixed(2),
      stock.volume,
      stock.marketCap.toFixed(0)
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const exportToExcel = (data, filename) => {
  // For now, we'll export as CSV since Excel export requires additional libraries
  // In a real application, you might want to use libraries like xlsx
  exportToCSV(data, filename);
};
