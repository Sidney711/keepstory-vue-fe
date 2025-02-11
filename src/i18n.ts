import { createI18n } from 'vue-i18n'

const messages = {
  cs: {
    validations: {
      required: "Pole je povinné.",
      minLength: "Pole musí mít minimálně {min} znaků.",
      email: "Zadejte platnou e-mailovou adresu.",
      maxLength: "Pole může mít maximálně {max} znaků.",
      sameAsPassword: "Pole se musí shodovat s heslem.",
      sameAsNewPassword: "Pole se musí shodovat s novým heslem.",
      notAfterToday: "Datum nesmí být pozdější než dnešní datum.",
      birthBeforeDeath: "Datum narození musí být stejné nebo menší než datum úmrtí."
    },
    registration: {
      label: {
        email: "E-mail",
        password: "Heslo",
        confirmPassword: "Potvrďte heslo"
      },
      placeholder: {
        email: "E-mailová adresa",
        password: "Zadejte heslo",
        confirmPassword: "Zadejte heslo znovu"
      },
      button: {
        signup: "Registrovat se"
      },
      link: {
        login: "Už máte účet? Přihlaste se zde!"
      },
      alert: {
        fillCorrectly: "Vyplňte všechna pole správně.",
        accountCreated: "Účet byl vytvořen. Zkontrolujte si e-mail pro verifikační odkaz.",
        registrationError: "Něco se pokazilo při registraci. Možná účet s touto e-mailovou adresou již existuje."
      }
    },
    login: {
      label: {
        email: "E-mail",
        password: "Heslo"
      },
      placeholder: {
        email: "E-mailová adresa",
        password: "Zadejte heslo"
      },
      button: {
        login: "Přihlásit se"
      },
      link: {
        forgotPassword: "Zapomenuté heslo?",
        register: "Nemáte účet? Zaregistrujte se!",
        resendVerification: "Znovu zaslat verifikační e-mail"
      },
      alert: {
        fillCorrectly: "Vyplňte všechny údaje správně.",
        loginFailed: "Nepodařilo se přihlásit. Zkontrolujte zadané údaje."
      }
    },
    resetPassword: {
      title: "Žádost o obnovení hesla",
      label: {
        email: "E-mailová adresa"
      },
      placeholder: {
        email: "Zadejte svůj e-mail"
      },
      button: {
        sendLink: "Odeslat odkaz"
      },
      link: {
        backToLogin: "Zpět na přihlášení"
      },
      alert: {
        fillCorrectly: "Vyplňte všechna pole správně.",
        linkSent: "Odkaz pro obnovení hesla byl odeslán na váš e-mail.",
        error: "Došlo k chybě. Ujistěte se, že jste zadali správný e-mail."
      }
    },
    resetPasswordPage: {
      title: "Resetovat heslo",
      label: {
        newPassword: "Nové heslo",
        confirmPassword: "Potvrďte heslo"
      },
      placeholder: {
        newPassword: "Zadejte své nové heslo",
        confirmPassword: "Potvrďte své nové heslo"
      },
      button: {
        resetPassword: "Resetovat heslo"
      },
      link: {
        backToLogin: "Zpět na přihlášení"
      },
      alert: {
        fillCorrectly: "Vyplňte všechna pole správně.",
        passwordResetSuccess: "Vaše heslo bylo úspěšně resetováno!",
        error: "Došlo k chybě při resetování hesla. Možná odkaz vypršel nebo heslo je stejné jako předchozí."
      }
    },
    verifyEmail: {
      title: "Odeslat verifikační e-mail",
      label: {
        email: "E-mailová adresa"
      },
      placeholder: {
        email: "Zadejte svůj e-mail"
      },
      button: {
        resend: "Odeslat verifikační e-mail"
      },
      link: {
        backToLogin: "Zpět na přihlášení"
      },
      alert: {
        fillCorrectly: "Prosím, vyplňte všechna pole správně.",
        emailSent: "Verifikační e-mail byl odeslán. Zkontrolujte svou doručenou poštu.",
        error: "Nepodařilo se odeslat verifikační e-mail. Ujistěte se, že jste zadali správnou e-mailovou adresu."
      }
    },
    verifyAccount: {
      alert: {
        verified: "Účet byl ověřen!",
        failed: "Ověření účtu selhalo. Možná odkaz vypršel."
      }
    },
    verifyEmailChange: {
      alert: {
        success: "E-mail byl úspěšně změněn!",
        failed: "Změna e-mailu selhala. Možná odkaz vypršel."
      }
    },
    profile: {
      title: "Profil",
      changePassword: {
        title: "Změna hesla",
        currentPasswordLabel: "Současné heslo",
        newPasswordLabel: "Nové heslo",
        confirmNewPasswordLabel: "Potvrzení nového hesla",
        button: "Změnit heslo",
        alert: {
          success: "Heslo bylo úspěšně změněno.",
          error: "Došlo k chybě při změně hesla."
        }
      },
      changeEmail: {
        title: "Změna e-mailu",
        newEmailLabel: "Nový e-mail",
        passwordLabel: "Heslo",
        button: "Změnit e-mail",
        alert: {
          success: "Žádost o změnu e-mailu byla odeslána na váš e-mail.",
          error: "Došlo k chybě při změně e-mailu."
        }
      },
      deleteAccount: {
        title: "Smazat účet",
        confirmPasswordLabel: "Heslo pro potvrzení",
        button: "Smazat účet",
        confirmMessage: "Opravdu chcete smazat účet? Tato operace je nevratná.",
        alert: {
          success: "Účet byl smazán.",
          error: "Došlo k chybě při mazání účtu."
        }
      }
    },
    menu: {
      family: "Moje rodina",
      profile: "Profil",
      logout: "Odhlásit se",
      language: {
        cs: "CS",
        en: "EN"
      }
    },
    general: {
      close: "Zavřít",
      delete: "Smazat",
      cancel: "Zrušit",
      "confirmation": "Potvrzení"
    },
    family: {
      loading: "Načítám data...",
      createMemberTitle: "Vytvořit novou osobu",
      button: {
        create: "Vytvořit novou osobu"
      },
      label: {
        firstName: "Jméno",
        lastName: "Příjmení",
        dateOfBirth: "Datum narození",
        isAlive: "Osoba je naživu",
        dateOfDeath: "Datum úmrtí"
      },
      hint: {
        dateOfDeath: "Zadejte datum úmrtí"
      }
    },
  },
  en: {
    validations: {
      required: "The field is required.",
      minLength: "The field must have at least {min} characters.",
      email: "Please enter a valid email address.",
      maxLength: "The field can have a maximum of {max} characters.",
      sameAsPassword: "The field must match the password.",
      sameAsNewPassword: "The field must match the new password.",
      notAfterToday: "The date must not be later than today.",
      birthBeforeDeath: "The date of birth must be the same or before the date of death."
    },
    registration: {
      label: {
        email: "E-mail",
        password: "Password",
        confirmPassword: "Confirm Password"
      },
      placeholder: {
        email: "Email address",
        password: "Enter your password",
        confirmPassword: "Enter your password again"
      },
      button: {
        signup: "Sign up"
      },
      link: {
        login: "Already have an account? Log in here!"
      },
      alert: {
        fillCorrectly: "Fill all fields correctly.",
        accountCreated: "Account was created. Check your email for a verification link.",
        registrationError: "Something went wrong during registration. Maybe an account with this email already exists."
      }
    },
    login: {
      label: {
        email: "E-mail",
        password: "Password"
      },
      placeholder: {
        email: "Email address",
        password: "Enter your password"
      },
      button: {
        login: "Log In"
      },
      link: {
        forgotPassword: "Forgot password?",
        register: "Don't have an account? Register!",
        resendVerification: "Resend verification email"
      },
      alert: {
        fillCorrectly: "Please fill in all fields correctly.",
        loginFailed: "Failed to log in. Please check your credentials."
      }
    },
    resetPassword: {
      title: "Reset Password Request",
      label: {
        email: "Email address"
      },
      placeholder: {
        email: "Enter your email"
      },
      button: {
        sendLink: "Send Reset Link"
      },
      link: {
        backToLogin: "Back to login"
      },
      alert: {
        fillCorrectly: "Fill all fields correctly.",
        linkSent: "Reset link has been sent to your email.",
        error: "An error occurred. Make sure you entered correct email."
      }
    },
    resetPasswordPage: {
      title: "Reset Password",
      label: {
        newPassword: "New Password",
        confirmPassword: "Confirm Password"
      },
      placeholder: {
        newPassword: "Enter your new password",
        confirmPassword: "Confirm your new password"
      },
      button: {
        resetPassword: "Reset Password"
      },
      link: {
        backToLogin: "Back to login"
      },
      alert: {
        fillCorrectly: "Fill all fields correctly.",
        passwordResetSuccess: "Your password has been reset successfully!",
        error: "There was an error resetting your password. Maybe the link has expired or the new password is the same as the old one."
      }
    },
    verifyEmail: {
      title: "Resend Verification Email",
      label: {
        email: "Email address"
      },
      placeholder: {
        email: "Enter your email"
      },
      button: {
        resend: "Resend Verification Email"
      },
      link: {
        backToLogin: "Back to login"
      },
      alert: {
        fillCorrectly: "Please fill all fields correctly.",
        emailSent: "Verification e-mail has been sent. Please check your inbox.",
        error: "Failed to resend verification e-mail. Make sure you have entered the correct email address."
      }
    },
    verifyAccount: {
      alert: {
        verified: "Account has been verified!",
        failed: "Account verification failed. Maybe the link has expired."
      }
    },
    verifyEmailChange: {
      alert: {
        success: "E-mail has been changed successfully!",
        failed: "E-mail change failed. Maybe the link has expired."
      }
    },
    profile: {
      title: "Profile",
      changePassword: {
        title: "Change Password",
        currentPasswordLabel: "Current Password",
        newPasswordLabel: "New Password",
        confirmNewPasswordLabel: "Confirm New Password",
        button: "Change Password",
        alert: {
          success: "Password changed successfully.",
          error: "An error occurred while changing password."
        }
      },
      changeEmail: {
        title: "Change Email",
        newEmailLabel: "New Email",
        passwordLabel: "Password",
        button: "Change Email",
        alert: {
          success: "Email change request has been sent to your email.",
          error: "An error occurred while changing email."
        }
      },
      deleteAccount: {
        title: "Delete Account",
        confirmPasswordLabel: "Password for Confirmation",
        button: "Delete Account",
        confirmMessage: "Are you sure you want to delete your account? This action is irreversible.",
        alert: {
          success: "Account has been deleted.",
          error: "An error occurred while deleting the account."
        }
      }
    },
    menu: {
      family: "My Family",
      profile: "Profile",
      logout: "Logout",
      language: {
        cs: "CS",
        en: "EN"
      }
    },
    general: {
      close: "Close",
      delete: "Delete",
      cancel: "Cancel",
      confirmation: "Confirmation"
    },
    family: {
      loading: "Loading data...",
      createMemberTitle: "Create New Family Member",
      button: {
        create: "Create New Family Member"
      },
      label: {
        firstName: "First Name",
        lastName: "Last Name",
        dateOfBirth: "Date of Birth",
        isAlive: "Member is alive",
        dateOfDeath: "Date of Death"
      },
      hint: {
        dateOfDeath: "Enter the date of death"
      }
    },
  }
}

export const i18n = createI18n({
  locale: 'cs',
  fallbackLocale: 'en',
  messages,
})
