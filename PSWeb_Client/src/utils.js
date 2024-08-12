
export const isJsonString = (data) => {
  try {
      JSON.parse(data)
  } catch (error) {
      return false
  }
  return true
}

export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

export const renderOptions = (arr) => {
  let results = [];
  if (arr) {
    results = arr?.map((opt) => {
      return {
        value: opt,
        label: opt,
      };
    });
  }
  results.push({
    label: "Add Category",
    value: "add_category",
  });
  return results;
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0, // Không bắt buộc hiển thị số 0 sau dấu chấm
    maximumFractionDigits: 2, // Hiển thị tối đa hai chữ số sau dấu chấm
  }).format(price);
};

export const formatDate = (date) => {
  if (!date) return "N/A"; // Xử lý khi giá trị date là null hoặc undefined
  const formattedDate = new Date(date);
  if (isNaN(formattedDate.getTime())) return "N/A"; // Kiểm tra nếu date không hợp lệ
  const year = formattedDate.getFullYear();
  const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
  const day = String(formattedDate.getDate()).padStart(2, "0");
  return `${day}-${month}-${year}`;
};
