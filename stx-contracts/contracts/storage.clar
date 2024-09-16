;; (define-public (claim)
;;   (let
;;     (
;;       (currentBeneficiary (unwrap! (var-get beneficiary) ERR_NO_VALUE))
;;     ) 
;;     (asserts! (<= (var-get unlockHeight) block-height) ERR_NOT_UNLOCKED)
;;     (asserts! (is-eq currentBeneficiary tx-sender) ERR_NOT_AUTHORIZED)

;;     (var-set beneficiary none)
;;     (var-set unlockHeight u0)
;;     (as-contract (stx-transfer? (stx-get-balance CONTRACT) CONTRACT currentBeneficiary))
;;   )
;; )

;; (define-public (bestow (newBeneficiary principal))
;;   (match (var-get beneficiary) currentBeneficiary
;;     (if (is-eq contract-caller currentBeneficiary)
;;       (ok (var-set beneficiary (some newBeneficiary))) 
;;       ERR_NOT_AUTHORIZED
;;     )
;;     ERR_NO_VALUE
;;   )
;; )