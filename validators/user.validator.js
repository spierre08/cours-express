import yup from "yup";

export const registerSchema = yup.object({
  body: yup.object({
    user_name: yup
      .string()
      .typeError("Le nom d'utilisateur doit être une chaîne de caractères")
      .required("Le nom d'utilisateur est requis"),

    email: yup
      .string()
      .typeError("L'adresse e-mail doit être une chaîne de caractères")
      .email("L'adresse e-mail doit être valide")
      .required("L'adresse e-mail est requise"),

    password: yup
      .string()
      .typeError("Le mot de passe doit être une chaîne de caractères")
      .min(6, "Le mot de passe doit contenir au moins 6 caractères")
      .required("Le mot de passe est requis"),
  }),
});

export const loginSchema = yup.object({
  body: yup.object({
    user_name: yup
      .string()
      .typeError("Le nom d'utilisateur doit être une chaîne de caractères")
      .required("Le nom d'utilisateur est requis"),

    password: yup
      .string()
      .typeError("Le mot de passe doit être une chaîne de caractères")
      .required("Le mot de passe est requis"),
  }),
});

export const updateUserSchema = yup.object({
  body: yup.object({
    user_name: yup
      .string()
      .typeError("Le nom d'utilisateur doit être une chaîne de caractères"),

    email: yup
      .string()
      .typeError("L'adresse e-mail doit être une chaîne de caractères")
      .email("L'adresse e-mail doit être valide"),
  }),
});
