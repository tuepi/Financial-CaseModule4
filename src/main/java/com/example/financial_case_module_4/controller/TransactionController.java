package com.example.financial_case_module_4.controller;

import com.example.financial_case_module_4.model.MoneyDetail;
import com.example.financial_case_module_4.model.Transaction;
import com.example.financial_case_module_4.model.Wallet;
import com.example.financial_case_module_4.service.moneyDetail.IMoneyDetailService;
import com.example.financial_case_module_4.service.transaction.ITransactionService;
import com.example.financial_case_module_4.service.wallet.IWalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/transactions")

public class TransactionController {
    @Autowired
    ITransactionService transactionService;
    @Autowired
    IMoneyDetailService moneyDetailService;
    @Autowired
    IWalletService walletService;
    @GetMapping
    public ResponseEntity<Iterable<Transaction>> findAllTransaction() {
        List<Transaction> transactions = (List<Transaction>) transactionService.findAll();
        if (transactions.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Transaction> findTransactionById(@PathVariable Long id) {
        Optional<Transaction> transactionOptional=transactionService.findById(id);
        if (!transactionOptional .isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(transactionOptional.get(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Transaction> saveTransaction(@RequestBody Transaction transaction) {
        Wallet wallet=walletService.findById(transaction.getWallet().getId()).get();
        MoneyDetail moneyDetail=moneyDetailService.findById(transaction.getMoneyDetail().getId()).get();
        Long a = transactionService.getMoneyCategoryByMoneyDetailId(transaction.getMoneyDetail().getId());
        if(a==1) {
            wallet.setMoneyAmount(wallet.getMoneyAmount() - transaction.getMoneyAmount());
        }else {
            wallet.setMoneyAmount(wallet.getMoneyAmount() + transaction.getMoneyAmount());
        }
        walletService.save(wallet);
        moneyDetailService.save(moneyDetail);

        return new ResponseEntity<>(transactionService.save(transaction), HttpStatus.CREATED);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Transaction> updateTransaction(@PathVariable Long id, @RequestBody Transaction transaction) {
        Optional<Transaction> transactionOptional = transactionService.findById(id);
        if (!transactionOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        transaction.setId(transactionOptional.get().getId());
        return new ResponseEntity<>(transactionService.save(transaction), HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Transaction> deleteTransaction(@PathVariable Long id) {
        Optional<Transaction> transactionOptional = transactionService.findById(id);
        if (!transactionOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        transactionService.remove(id);
        return new ResponseEntity<>(transactionOptional.get(), HttpStatus.NO_CONTENT);
    }
    @GetMapping("/findAllByWallet")
    public ResponseEntity<Iterable<Transaction>>findAllByWallet(@RequestParam Wallet wallet){
        List<Transaction> transactions = (List<Transaction>) transactionService.findAllByWallet(wallet);
        if (transactions.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }
    @GetMapping("/findAllByCreatedDate")
    public ResponseEntity<Iterable<Transaction>>findAllByCreatedDateBetween(@RequestParam String fromTime,@RequestParam String toTime){
        if(fromTime.equals("") && toTime.equals("")){
            fromTime = "1900-01-01T00:00:00";
            toTime = String.valueOf(LocalDateTime.now());
        }
        return new ResponseEntity<>(transactionService.findAllByCreatedDateBetween(LocalDateTime.parse(fromTime), LocalDateTime.parse(toTime)), HttpStatus.OK);
    }
    @GetMapping("/findAllByWalletAndCreatedDateBetween/{id}")
    public ResponseEntity<Iterable<Transaction>>findAllByWalletAndCreatedDateBetween(@RequestParam Long id,@RequestParam String fromTime,@RequestParam String toTime){
        if(fromTime.equals("") && toTime.equals("")){
            fromTime = "1900-01-01T00:00:00";
            toTime = String.valueOf(LocalDateTime.now());
        }
        return new ResponseEntity<>(transactionService.findAllByWalletAndCreatedDateBetween(id,LocalDateTime.parse(fromTime), LocalDateTime.parse(toTime)), HttpStatus.OK);
    }
}
