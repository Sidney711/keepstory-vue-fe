import { createI18n } from 'vue-i18n'

const messages = {
  cs: {
    titles: {
      login: "Přihlášení",
      registration: "Registrace",
      verifyAccount: "Ověření účtu",
      verifyAccountResend: "Znovu odeslat ověřovací e-mail",
      resetPasswordRequest: "Obnovení hesla",
      resetPassword: "Resetování hesla",
      profile: "Nastavení účtu",
      verifyEmailChange: "Ověření změny e-mailu",
      familyMembers: "Moje rodina",
      familyMemberDetail: "Detail člena rodiny",
      newStory: "Nový příběh",
      storyDetail: "Detail příběhu",
      editStory: "Editace příběhu"
    },
    validations: {
      required: "Pole je povinné.",
      minLength: "Pole musí mít minimálně {min} znaků.",
      email: "Zadejte platnou e-mailovou adresu.",
      maxLength: "Pole může mít maximálně {max} znaků.",
      sameAsPassword: "Pole se musí shodovat s heslem.",
      sameAsNewPassword: "Pole se musí shodovat s novým heslem.",
      notAfterToday: "Datum nesmí být pozdější než dnešní datum.",
      birthBeforeDeath: "Datum narození musí být stejné nebo menší než datum úmrtí.",
      emptyIfAlive: "Tata hodnota nesmí být zadána, pokud je osoba naživu.",
      differentFromMother: "Matka a otec musí být rozdílné osoby."
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
        accountCreated: "Účet byl vytvořen. Na Váš e-mail byl zaslán verifikační odkaz.",
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
      profilePictureAlt: "Profilový obrázek",
      title: "Nastavení účtu",
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
        confirmMessage: "Opravdu chcete smazat účet? Všichni členové rodiny a jejich data budou smazáni. Tato operace je nevratná.",
        alert: {
          success: "Účet byl smazán.",
          error: "Došlo k chybě při mazání účtu."
        }
      },
      updateProfilePictureTitle: "Aktualizace profilové fotky",
      chooseNewPhoto: "Vyberte novou fotku",
      deletePhoto: "Smazat fotku",
      photoAdded: "Profilová fotka byla přidána.",
      photoUploadError: "Při nahrávání profilové fotky došlo k chybě.",
      confirmDeletePhotoMessage: "Opravdu chcete smazat profilovou fotku?",
      deletePhotoTitle: "Smazání profilové fotky",
      photoDeleted: "Profilová fotka byla smazána.",
      photoDeleteError: "Při smazání profilové fotky došlo k chybě."
    },
    menu: {
      family: "Moje rodina",
      profile: "Nastavení účtu",
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
      confirmation: "Potvrzení",
      backToFamily: "Zpět na rodinu",
      save: "Uložit"
    },
    family: {
      label: {
        firstName: "Jméno",
        lastName: "Příjmení",
        dateOfBirth: "Datum narození",
        isAlive: "Osoba je naživu",
        alive: "Žije osoba",
        dateOfDeath: "Datum úmrtí",
        shortDescription: "Krátký popis osoby",
        birthLastName: "Rodné příjmení",
        birthPlace: "Místo narození",
        birthTime: "Čas narození",
        gender: "Pohlaví",
        religion: "Náboženství",
        profession: "Profese",
        deathTime: "Čas úmrtí",
        deathPlace: "Místo úmrtí",
        causeOfDeath: "Příčina smrti",
        burialDate: "Datum pohřbu",
        burialPlace: "Místo pohřbu",
        internmentPlace: "Místo pochování",
        mother: "Matka",
        father: "Otec",
        hobbies: "Koníčky a zájmy",
        shortMessage: "Krátký vzkaz"
      },
      gender: {
        male: "Muž",
        female: "Žena",
        other: "Ostatní"
      },
      relationship: {
        mother: "Matka",
        father: "Otec",
        grandparent: "Prarodič",
        descendant: "Potomek",
        sibling: "Sourozenec"
      },
      text: {
        birthDate: "nar."
      },
      section: {
        basicInfo: "Základní informace",
        deathInfo: "Informace o úmrtí",
        familyInfo: "Rodinné vazby a další informace"
      },
      createMemberTitle: "Vytvořit novou osobu",
      editMemberTitle: "Editace člena rodiny",
      alert: {
        successCreate: "Osoba byla úspěšně vytvořena.",
        errorCreate: "Při vytváření osoby došlo k chybě",
        successUpdate: "Údaje byly upraveny.",
        errorUpdate: "Při ukládání změn došlo k chybě. Možná není možné, aby některá z vámi zadaných rodinných vazeb nastala."
      },
      personalDetails: "Osobní údaje",
      relatives: "Příbuzní",
      hobbiesTitle: "Koníčky a zájmy",
      shortMessageTitle: "Krátký vzkaz",
      notFound: "Člen rodiny nebyl nalezen.",
      deleteConfirmMessage: "Opravdu chcete smazat tohoto člena rodiny? Jeho smazáním dojde také k odebrání všech jeho dokumentů, souborů, příběhů apod. Tuto akci nelze vrátit zpět.",
      deleteTitle: "Smazání člena rodiny",
      deleteSuccess: "Člen rodiny byl smazán.",
      deleteError: "Nepodařilo se smazat člena rodiny.",
      approximate: "odhad",
      button: {
        create: "Vytvořit člena"
      },
      loading: "Načítání...",
      search: "Hledat...",
      sortByDOB: "Seřadit podle data narození",
      sortOptions: {
        oldest: "Od nejstaršího",
        youngest: "Od nejmladšího"
      },
      backToMember: "Zpět na člena rodiny",
    },
    additional_attribute: {
      dialog: {
        title: {
          create: "Přidat další údaj",
          update: "Upravit další údaj"
        }
      },
      field: {
        attributeName: "Název atributu",
        longText: "Text"
      },
      button: {
        create: "Vytvořit",
        update: "Upravit"
      },
      delete: {
        confirmMessage: "Opravdu chcete smazat tento údaj?",
        title: "Smazání údaje",
        alert: {
          successDelete: "Údaj byl úspěšně smazán.",
          errorDelete: "Došlo k chybě při mazání údaje."
        }
      },
      alert: {
        successCreate: "Údaj byl úspěšně vytvořen.",
        successUpdate: "Údaj byl úspěšně upraven.",
        error: "Došlo k chybě."
      },
      label: "Další údaje"
    },
    education: {
      title: "Vzdělání",
      dialog: {
        title: {
          create: "Přidat vzdělání",
          update: "Upravit vzdělání"
        }
      },
      field: {
        schoolName: "Název školy",
        address: "Adresa školy",
        period: "Období"
      },
      button: {
        create: "Vytvořit",
        update: "Upravit"
      },
      delete: {
        confirmMessage: "Opravdu chcete smazat tohle vzdělání?",
        title: "Smazání vzdělání",
        alert: {
          successDelete: "Vzdělání bylo úspěšně smazáno.",
          errorDelete: "Došlo k chybě při mazání vzdělání."
        }
      },
      alert: {
        successCreate: "Vzdělání bylo úspěšně vytvořeno.",
        successUpdate: "Vzdělání bylo úspěšně upraveno.",
        error: "Došlo k chybě."
      }
    },
    employment: {
      dialog: {
        title: {
          create: "Přidat zaměstnání",
          update: "Upravit zaměstnání"
        }
      },
      field: {
        employer: "Zaměstnavatel",
        address: "Adresa zaměstnavatele",
        period: "Období"
      },
      button: {
        create: "Vytvořit",
        update: "Upravit"
      },
      delete: {
        confirmMessage: "Opravdu chcete smazat tohle zaměstnání?",
        title: "Smazání zaměstnání",
        alert: {
          successDelete: "Zaměstnání bylo úspěšně smazáno.",
          errorDelete: "Došlo k chybě při mazání zaměstnání."
        }
      },
      alert: {
        successCreate: "Zaměstnání bylo úspěšně vytvořeno.",
        successUpdate: "Zaměstnání bylo úspěšně upraveno.",
        error: "Došlo k chybě."
      },
      title: "Zaměstnání a profese",
      employerLabel: "Zaměstnavatel",
      addressLabel: "Adresa",
      periodLabel: "Období",
      profession: "Profese"
    },
    export_pdf: {
      title: "Export PDF",
      chooseExport: "Vyberte, co chcete exportovat:",
      radio: {
        family_tree: "Exportovat rodokmen tohoto člena",
        member: "Exportovat knihu pouze tohoto člena",
        family: "Exportovat knihu celé rodiny"
      },
      description: "Výsledný export bude uložen v dokumentech a budete informováni emailem, až bude export hotový.",
      button: {
        export: "Exportovat"
      },
      alert: {
        success: "Export byl úspěšně zahájen. Budete informováni emailem, až bude export hotový.",
        error: "Export selhal. Zkuste to prosím znovu."
      }
    },
    signature: {
      updateSignatureTitle: "Aktualizace podpisu",
      chooseNewSignature: "Vyberte nový podpis",
      deleteSignature: "Smazat podpis",
      signatureAdded: "Podpis byl přidán.",
      signatureUploadError: "Při nahrávání podpisu došlo k chybě.",
      confirmDeleteSignatureMessage: "Opravdu chcete smazat podpis?",
      deleteSignatureTitle: "Smazání podpisu",
      signatureDeleted: "Podpis byl odebrán.",
      signatureDeleteError: "Při mazání podpisu došlo k chybě.",
      label: "Podpis"
    },
    marriage: {
      title: "Manželství",
      partnerLabel: "Partner",
      periodLabel: "Období",
      updateTitle: "Upravit manželství",
      createTitle: "Přidat manželství",
      period: "Období",
      secondPartner: "Druhý partner",
      update: "Upravit",
      create: "Vytvořit",
      alert: {
        successUpdate: "Manželství bylo úspěšně upraveno.",
        successCreate: "Manželství bylo úspěšně vytvořeno.",
        error: "Došlo k chybě při zpracování manželství.",
        successDelete: "Manželství bylo úspěšně smazáno.",
        errorDelete: "Došlo k chybě při mazání manželství."
      },
      deleteConfirmMessage: "Opravdu chcete smazat tohle manželství?",
      deleteTitle: "Smazání manželství"
    },
    residence: {
      title: "Adresy pobytu",
      addressLabel: "Adresa",
      periodLabel: "Období"
    },
    documents: {
      uploaded: "Nahrané dokumenty",
      uploadButton: "Nahrát dokumenty",
      exportedPDF: "Vyexportované PDF",
      deleteConfirmMessage: "Opravdu chcete smazat tento soubor?",
      deleteTitle: "Smazání souboru",
      documentDeleted: "Dokument byl smazán.",
      documentDeleteError: "Nepodařilo se smazat dokument.",
      documentDownloading: "Dokument se brzy začne stahovat.",
      documentDownloadError: "Nepodařilo se stáhnout dokument.",
      uploadTitle: "Nahrát dokumenty",
      dropzoneLabel: "Přetáhněte dokumenty sem nebo klikněte pro výběr",
      upload: "Nahrát",
      uploadSuccess: "Dokumenty byly nahrány.",
      uploadError: "Nepodařilo se nahrát dokumenty."
    },
    tabs: {
      basicInfo: "Základní informace",
      docs: "Dokumenty a exporty",
      gallery: "Galerie",
      stories: "Příběhy"
    },
    gallery: {
      title: "Galerie",
      uploadPhotos: "Nahrát fotky",
      deleteConfirmMessage: "Opravdu chcete smazat tuhle fotku?",
      deleteTitle: "Smazání fotky",
      photoDeleted: "Fotka byla úspěšně smazána.",
      photoDeleteError: "Nepodařilo se smazat fotku.",
      photoDownloading: "Fotka se za chvilku začne stahovat.",
      photoDownloadError: "Nepodařilo se stáhnout fotku.",
      imageAlt: "Obrázek",
      uploadTitle: "Nahrát fotky",
      dropzoneLabel: "Přetáhněte fotky sem nebo klikněte pro výběr",
      upload: "Nahrát",
      uploadSuccess: "Fotky byly úspěšně nahrány.",
      uploadError: "Nahrávání fotek selhalo.",
      onlyImages: "Nahrávat můžete pouze obrázky!"
    },
    stories: {
      newStory: "Nový příběh",
      created: "Vytvořeno:",
      date: "Datum"
    },
    residence_address: {
      updateTitle: "Upravit adresu pobytu",
      createTitle: "Přidat adresu pobytu",
      address: "Adresa",
      period: "Období",
      update: "Upravit",
      create: "Vytvořit",
      alert: {
        successUpdate: "Adresa pobytu byla úspěšně upravena.",
        successCreate: "Adresa pobytu byla úspěšně vytvořena.",
        successDelete: "Adresa pobytu byla úspěšně smazána.",
        error: "Došlo k chybě při zpracování adresy pobytu.",
        errorDelete: "Došlo k chybě při mazání adresy pobytu."
      },
      deleteConfirmMessage: "Opravdu chcete smazat tuhle adresu?",
      deleteTitle: "Smazání adresy"
    },
    story: {
      editTitle: "Upravit příběh",
      editInfo: "Informace o příběhu",
      label: {
        title: "Název příběhu",
        targetMembers: "Koho se příběh týká",
        selectDate: "Vyberte datum",
        year: "Rok příběhu",
        dateApproximation: "Odhad datumu"
      },
      radio: {
        exactDate: "Přesné datum",
        yearOnly: "Pouze rok"
      },
      button: {
        saveChanges: "Uložit změny",
        publish: "Publikovat příběh"
      },
      validation: {
        futureDate: "Datum nesmí být v budoucnu.",
        validYear: "Rok musí být nezáporný a nesmí být v budoucnu.",
        emptyIfExact: "Pro vybraný typ data nesmí být rok zadán.",
        emptyIfYear: "Pro vybraný typ data nesmí být datum zadáno.",
        atLeastOneMember: "Musí být vybrán alespoň jeden člen"
      },
      updateSuccess: "Příběh byl úspěšně aktualizován.",
      updateError: "Chyba při aktualizaci příběhu.",
      publishSuccess: "Příběh byl úspěšně publikován.",
      publishError: "Chyba při publikaci příběhu.",
      created: "Vytvořeno:",
      date: "Datum",
      deleteConfirmMessage: "Opravdu chcete smazat tento příběh? Odebere se u všech členů rodiny, kterých se příběh týká.",
      deleteTitle: "Smazání příběhu",
      deleteSuccess: "Příběh byl úspěšně smazán.",
      deleteError: "Chyba při mazání příběhu.",
      approximate: "odhad"
    }
  },
  en: {
    titles: {
      login: "Login",
      registration: "Registration",
      verifyAccount: "Verify Account",
      verifyAccountResend: "Resend Verification Email",
      resetPasswordRequest: "Reset Password Request",
      resetPassword: "Reset Password",
      profile: "Account Settings",
      verifyEmailChange: "Verify Email Change",
      familyMembers: "My Family",
      familyMemberDetail: "Family Member Detail",
      newStory: "New Story",
      storyDetail: "Story Detail",
      editStory: "Edit Story"
    },
    validations: {
      required: "The field is required.",
      minLength: "The field must have at least {min} characters.",
      email: "Please enter a valid email address.",
      maxLength: "The field can have a maximum of {max} characters.",
      sameAsPassword: "The field must match the password.",
      sameAsNewPassword: "The field must match the new password.",
      notAfterToday: "The date must not be later than today.",
      birthBeforeDeath: "The date of birth must be the same or before the date of death.",
      emptyIfAlive: "This value must not be provided if the person is alive.",
      differentFromMother: "Mother and father must be different persons."
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
      profilePictureAlt: "Profile Picture",
      title: "Account Settings",
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
        confirmMessage: "Are you sure you want to delete your account? All your family members and their data will be lost. This action is irreversible.",
        alert: {
          success: "Account has been deleted.",
          error: "An error occurred while deleting the account."
        }
      },
      updateProfilePictureTitle: "Update Profile Picture",
      chooseNewPhoto: "Choose a new photo",
      deletePhoto: "Delete Photo",
      photoAdded: "Profile picture has been added.",
      photoUploadError: "An error occurred while uploading the profile picture.",
      confirmDeletePhotoMessage: "Do you really want to delete the profile picture?",
      deletePhotoTitle: "Delete Profile Picture",
      photoDeleted: "Profile picture has been deleted.",
      photoDeleteError: "An error occurred while deleting the profile picture."
    },
    menu: {
      family: "My Family",
      profile: "Account Settings",
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
      confirmation: "Confirmation",
      save: "Save",
      backToFamily: "Back to Family"
    },
    family: {
      loading: "Loading data...",
      createMemberTitle: "Create New Family Member",
      editMemberTitle: "Edit Family Member",
      section: {
        basicInfo: "Basic Information",
        deathInfo: "Death Information",
        familyInfo: "Family Relationships and Additional Information"
      },
      label: {
        firstName: "First Name",
        lastName: "Last Name",
        dateOfBirth: "Date of Birth",
        isAlive: "Member is alive",
        dateOfDeath: "Date of Death",
        shortDescription: "Short Description",
        birthLastName: "Birth Last Name",
        birthPlace: "Place of Birth",
        birthTime: "Time of Birth",
        gender: "Gender",
        religion: "Religion",
        profession: "Profession",
        deathTime: "Time of Death",
        deathPlace: "Place of Death",
        causeOfDeath: "Cause of Death",
        burialDate: "Burial Date",
        burialPlace: "Burial Place",
        internmentPlace: "Internment Place",
        mother: "Mother",
        father: "Father",
        hobbies: "Hobbies and Interests",
        shortMessage: "Short Message",
        alive: "Alive"
      },
      gender: {
        male: "Male",
        female: "Female",
        other: "Other"
      },
      relationship: {
        mother: "Mother",
        father: "Father",
        grandparent: "Grandparent",
        descendant: "Descendant",
        sibling: "Sibling"
      },
      hint: {
        dateOfDeath: "Enter the date of death"
      },
      button: {
        create: "Create New Family Member"
      },
      alert: {
        successCreate: "Family member was created successfully.",
        errorCreate: "An error occurred while creating a family member.",
        successUpdate: "Member details have been updated.",
        errorUpdate: "An error occurred while saving changes. Some of the specified family relationships might be invalid."
      },
      text: {
        birthDate: "b."
      },
      personalDetails: "Personal Details",
      relatives: "Relatives",
      hobbiesTitle: "Hobbies and Interests",
      shortMessageTitle: "Short Message",
      notFound: "Family member not found.",
      deleteConfirmMessage: "Are you sure you want to delete this family member? Deleting will also remove all documents, files, stories, etc. This action cannot be undone.",
      deleteTitle: "Delete Family Member",
      deleteSuccess: "Family member has been deleted.",
      deleteError: "Failed to delete family member.",
      approximate: "approx.",
      search: "Search...",
      sortByDOB: "Sort by Date of Birth",
      sortOptions: {
        oldest: "Oldest first",
        youngest: "Youngest first"
      },
      backToMember: "Back to Family Member"
    },
    additional_attribute: {
      dialog: {
        title: {
          create: "Add Additional Attribute",
          update: "Edit Additional Attribute"
        }
      },
      field: {
        attributeName: "Attribute Name",
        longText: "Text"
      },
      button: {
        create: "Create",
        update: "Update"
      },
      delete: {
        confirmMessage: "Are you sure you want to delete this attribute?",
        title: "Delete Attribute",
        alert: {
          successDelete: "Attribute was deleted successfully.",
          errorDelete: "An error occurred while deleting the attribute."
        }
      },
      alert: {
        successCreate: "Attribute was created successfully.",
        successUpdate: "Attribute was updated successfully.",
        error: "An error occurred."
      },
      label: "Additional Attributes"
    },
    education: {
      dialog: {
        title: {
          create: "Add Education",
          update: "Edit Education"
        }
      },
      field: {
        schoolName: "School Name",
        address: "School Address",
        period: "Period"
      },
      button: {
        create: "Create",
        update: "Update"
      },
      delete: {
        confirmMessage: "Are you sure you want to delete this education?",
        title: "Delete Education",
        alert: {
          successDelete: "Education was deleted successfully.",
          errorDelete: "An error occurred while deleting education."
        }
      },
      alert: {
        successCreate: "Education was created successfully.",
        successUpdate: "Education was updated successfully.",
        error: "An error occurred."
      },
      title: "Education"
    },
    employment: {
      dialog: {
        title: {
          create: "Add Employment",
          update: "Edit Employment"
        }
      },
      field: {
        employer: "Employer",
        address: "Employer Address",
        period: "Period"
      },
      button: {
        create: "Create",
        update: "Update"
      },
      delete: {
        confirmMessage: "Are you sure you want to delete this employment?",
        title: "Delete Employment",
        alert: {
          successDelete: "Employment was deleted successfully.",
          errorDelete: "An error occurred while deleting employment."
        }
      },
      alert: {
        successCreate: "Employment was created successfully.",
        successUpdate: "Employment was updated successfully.",
        error: "An error occurred."
      },
      title: "Employment and Profession",
      employerLabel: "Employer",
      addressLabel: "Address",
      periodLabel: "Period",
      profession: "Profession"
    },
    export_pdf: {
      title: "Export PDF",
      chooseExport: "Select what you want to export:",
      radio: {
        family_tree: "Export family tree of this member",
        member: "Export book of this member only",
        family: "Export book of the entire family"
      },
      description: "The export will be saved in your documents and you will be notified by email once the export is complete.",
      button: {
        export: "Export"
      },
      alert: {
        success: "Export has been successfully initiated. You will be notified by email once the export is complete.",
        error: "Export failed. Please try again."
      }
    },
    signature: {
      updateSignatureTitle: "Update Signature",
      chooseNewSignature: "Choose a new signature",
      deleteSignature: "Delete Signature",
      signatureAdded: "Signature has been added.",
      signatureUploadError: "An error occurred while uploading the signature.",
      confirmDeleteSignatureMessage: "Do you really want to delete the signature?",
      deleteSignatureTitle: "Delete Signature",
      signatureDeleted: "Signature has been removed.",
      signatureDeleteError: "An error occurred while deleting the signature.",
      label: "Signature"
    },
    marriage: {
      title: "Marriages",
      partnerLabel: "Partner",
      periodLabel: "Period",
      updateTitle: "Edit Marriage",
      createTitle: "Add Marriage",
      period: "Period",
      secondPartner: "Second Partner",
      update: "Update",
      create: "Create",
      alert: {
        successUpdate: "Marriage has been successfully updated.",
        successCreate: "Marriage has been successfully created.",
        error: "An error occurred while processing the marriage.",
        successDelete: "Marriage has been successfully deleted.",
        errorDelete: "An error occurred while deleting the marriage."
      },
      deleteConfirmMessage: "Are you sure you want to delete this marriage?",
      deleteTitle: "Delete Marriage"
    },
    title: "Employment and Profession",
    employerLabel: "Employer",
    addressLabel: "Address",
    periodLabel: "Period",
    profession: "Profession",
    residence: {
      title: "Residence Addresses",
      addressLabel: "Address",
      periodLabel: "Period"
    },
    documents: {
      uploaded: "Uploaded Documents",
      uploadButton: "Upload Documents",
      exportedPDF: "Exported PDF",
      deleteConfirmMessage: "Are you sure you want to delete this file?",
      deleteTitle: "Delete File",
      documentDeleted: "Document has been deleted.",
      documentDeleteError: "Failed to delete the document.",
      documentDownloading: "The document will start downloading shortly.",
      documentDownloadError: "Failed to download the document.",
      uploadTitle: "Upload Documents",
      dropzoneLabel: "Drag and drop documents here or click to select",
      upload: "Upload",
      uploadSuccess: "Documents have been uploaded.",
      uploadError: "Failed to upload documents."
    },
    tabs: {
      basicInfo: "Basic Information",
      docs: "Documents and Exports",
      gallery: "Gallery",
      stories: "Stories"
    },
    gallery: {
      title: "Gallery",
      uploadPhotos: "Upload Photos",
      deleteConfirmMessage: "Are you sure you want to delete this photo?",
      deleteTitle: "Delete Photo",
      photoDeleted: "Photo has been successfully deleted.",
      photoDeleteError: "Failed to delete the photo.",
      photoDownloading: "The photo will start downloading shortly.",
      photoDownloadError: "Failed to download the photo.",
      imageAlt: "Image",
      uploadTitle: "Upload Photos",
      dropzoneLabel: "Drag and drop photos here or click to select",
      upload: "Upload",
      uploadSuccess: "Photos have been successfully uploaded.",
      uploadError: "Photo upload failed.",
      onlyImages: "Only images can be uploaded!"
    },
    stories: {
      newStory: "New Story",
      created: "Created:",
      date: "Date"
    },
    residence_address: {
      updateTitle: "Edit Residence Address",
      createTitle: "Add Residence Address",
      address: "Address",
      period: "Period",
      update: "Update",
      create: "Create",
      alert: {
        successUpdate: "Residence address has been successfully updated.",
        successCreate: "Residence address has been successfully created.",
        successDelete: "Residence address has been successfully deleted.",
        error: "An error occurred while processing the residence address.",
        errorDelete: "An error occurred while deleting the residence address."
      },
      deleteConfirmMessage: "Are you sure you want to delete this address?",
      deleteTitle: "Delete Address"
    },
    story: {
      editTitle: "Edit Story",
      editInfo: "Story Information",
      label: {
        title: "Story Title",
        targetMembers: "Who is this story about",
        selectDate: "Select a date",
        year: "Story Year",
        dateApproximation: "Date approximation"
      },
      radio: {
        exactDate: "Exact date",
        yearOnly: "Year only"
      },
      button: {
        saveChanges: "Save Changes",
        publish: "Publish Story"
      },
      validation: {
        futureDate: "The date must not be in the future.",
        validYear: "The year must be non-negative and not in the future.",
        emptyIfExact: "No year should be entered for exact date type.",
        emptyIfYear: "No date should be entered for year-only type.",
        atLeastOneMember: "At least one member must be selected"
      },
      updateSuccess: "The story has been successfully updated.",
      updateError: "Error updating the story.",
      publishSuccess: "The story has been successfully published.",
      publishError: "Error publishing the story.",
      created: "Created:",
      date: "Date",
      deleteConfirmMessage: "Are you sure you want to delete this story? It will be removed from all family members it is associated with.",
      deleteTitle: "Delete Story",
      deleteSuccess: "The story has been successfully deleted.",
      deleteError: "Error deleting the story.",
      approximate: "approx."
    }
  }
}

export const i18n = createI18n({
  locale: 'cs',
  fallbackLocale: 'en',
  messages,
})
