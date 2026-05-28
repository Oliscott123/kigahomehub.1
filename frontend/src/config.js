// Simple frontend config for contact information
// Admin phone — normalized to E.164 (country code + local without leading zero)
export const ADMIN_PHONE = '+250784764923'; // updated from user-provided 0784764923
export const DEFAULT_WA_MESSAGE = (title, id) =>
  `Hello, I'm interested in the property \"${title}\" (id: ${id}). Could you please provide more details?`;

export default { ADMIN_PHONE, DEFAULT_WA_MESSAGE };
