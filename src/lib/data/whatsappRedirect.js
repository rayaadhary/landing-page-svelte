export const createWhatsAppLink = (number, message) => {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
};

export const whatsappNumber = '6289671328650';
export const whatsappMessage = 'Halo Saya Tertarik menggunakan sistem dari sitemedika bisa tolong dibantu?';
export const whatsappLink = createWhatsAppLink(whatsappNumber, whatsappMessage);
