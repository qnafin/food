import { ModalLead } from '#components'

let modalInstance: any = null

export function useLeadModal() {
  const overlay = useOverlay()

  // Ленивое создание модалки (один раз)
  const getModal = () => {
    if (!modalInstance) {
      modalInstance = overlay.create(ModalLead)
    }
    return modalInstance
  }

  const openLeadModal = (leadType: string) => {
    getModal().open({ leadType })
  }

  return { openLeadModal }
}
