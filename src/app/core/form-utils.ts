export const markFormGroupDirty = (formGroup) => {
  formGroup.markAsDirty();
  (Object as any).values(formGroup.controls).forEach(control => {
    control.markAsDirty();
    control.updateValueAndValidity();
    if (control.controls) {
      markFormGroupDirty(control);
    }
  });
  formGroup.updateValueAndValidity();
};

export const disableFormGroup = (formGroup) => {
  formGroup.disable();
  (Object as any).values(formGroup.controls).forEach(control => {
    formGroup.disable();
    if (control.controls) {
      disableFormGroup(control);
    }
  });
};
