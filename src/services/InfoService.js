export default {
    showToast(toast, summary = 'Success', detail = 'Success message', severity = 'success', life = 3000) {
        toast.add({
            severity: severity,
            summary: summary,
            detail: detail,
            life: life,
        });
    }
}