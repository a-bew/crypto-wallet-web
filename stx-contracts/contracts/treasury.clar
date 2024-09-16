(define-constant CONTRACT_OWNER tx-sender)
(define-data-var treasuryBalance uint u0)
;; (define-map deposits principal uint)

;; (define-read-only (get-total-deposit (who principal))
;;     (default-to u0 (map-get? deposits who))
;; )

;; (define-public (deposit (amount uint))
;;     (begin
;;         (stx-transfer? amount tx-sender (as-contract tx-sender))
;;         (map-set deposits tx-sender (+ (get-total-deposit tx-sender) amount))
;;         (ok true)
;;     )
;; )

;; ;; Try a test deposit
;; (print (deposit u500))

(define-public (deposit (amount uint))
  (begin
    (asserts! (>= (stx-get-balance tx-sender) amount) (err u401))
    (try! (stx-transfer? amount tx-sender (as-contract tx-sender)))
    (var-set treasuryBalance (+ (var-get treasuryBalance) amount))
    (ok true)
  )
)

(define-public (withdraw (recipient principal) (amount uint))
  (begin
    ;; (let (
    ;;   (recipientSavings (unwrap! (map-get? deposits recipient) (err "Invalid recipient"))
    ;; ) 
    ;; (asserts! (>= recipientSavings amount) (err "Insufficient Balance"))
    (asserts! (is-eq tx-sender CONTRACT_OWNER) (err u403))
    (asserts! (<= amount (var-get treasuryBalance)) (err u401))
    (try! (as-contract (stx-transfer? amount tx-sender recipient)))
    (var-set treasuryBalance (- (var-get treasuryBalance) amount))
    (ok true) 
    
    )
  
   
  )
