package com.example.financial_case_module_4.controller;

import com.example.financial_case_module_4.model.*;
import com.example.financial_case_module_4.service.moneyCategory.IMoneyCategoryService;
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
    @Autowired
    IMoneyCategoryService categoryService;
    @GetMapping
    public ResponseEntity<Iterable<Transaction>> findAllTransactionByWallet() {
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
        MoneyDetail moneyDetail = moneyDetailService.findById(transaction.getMoneyDetail().getId()).get();
        transaction.setCreatedDate(LocalDateTime.now());
        if(moneyDetail.getId() == 1) {
            wallet.setMoneyAmount(wallet.getMoneyAmount() + transaction.getMoneyAmount());
        }else {
            wallet.setMoneyAmount(wallet.getMoneyAmount() - transaction.getMoneyAmount());
        }
        walletService.save(wallet);
        return new ResponseEntity<>(transactionService.save(transaction), HttpStatus.CREATED);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Transaction> updateTransaction(@PathVariable Long id, @RequestBody Transaction transaction,@RequestParam("old") Double money) {
        Optional<Transaction> transactionOptional = transactionService.findById(id);
        if (!transactionOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        transaction.setId(transactionOptional.get().getId());
        Wallet wallet=walletService.findById(transaction.getWallet().getId()).get();
        transaction.setWallet(wallet);
        MoneyDetail moneyDetail = moneyDetailService.findById(transaction.getMoneyDetail().getId()).get();
        transaction.setCreatedDate(LocalDateTime.now());
        if(moneyDetail.getId() == 1) {
            wallet.setMoneyAmount(wallet.getMoneyAmount() - money);
            wallet.setMoneyAmount(wallet.getMoneyAmount() + transaction.getMoneyAmount());
        }else {
            wallet.setMoneyAmount(wallet.getMoneyAmount() + money);
            wallet.setMoneyAmount(wallet.getMoneyAmount() - transaction.getMoneyAmount());
        }
        return new ResponseEntity<>(transactionService.save(transaction), HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Transaction> deleteTransaction(@PathVariable Long id,@RequestParam("old") Double money) {
        Optional<Transaction> transactionOptional = transactionService.findById(id);
        if (!transactionOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Transaction transaction = transactionService.findById(id).get();
        Wallet wallet = walletService.findById(transaction.getWallet().getId()).get();
        transaction.setWallet(wallet);
        MoneyDetail moneyDetail = moneyDetailService.findById(transaction.getMoneyDetail().getId()).get();
        if(moneyDetail.getId() == 1) {
            wallet.setMoneyAmount(wallet.getMoneyAmount() - money);
        }else {
            wallet.setMoneyAmount(wallet.getMoneyAmount() + money);
        }
        walletService.save(wallet);
        transactionService.remove(id);
        return new ResponseEntity<>(transactionOptional.get(), HttpStatus.NO_CONTENT);
    }
    @GetMapping("/findAllByWallet/{id}")
    public ResponseEntity<Iterable<Transaction>>findAllByWallet(@PathVariable Long id){
        Wallet wallet = walletService.findById(id).get();
        List<Transaction> transactions = (List<Transaction>) transactionService.findAllByWallet(wallet);
        if (transactions.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    @GetMapping("/findAllMoneyDetail/{id}")
    public ResponseEntity<Iterable<Transaction>> findAllMoneyDetailByName(@PathVariable Long id){
        return new ResponseEntity<>(transactionService.findAllByMoneyCategory_Id(id),HttpStatus.OK);
    }
    @GetMapping("/findAllMoneyCategories")
    public ResponseEntity<Iterable<MoneyCategory>> findAllMoneyCategory(){
        return new ResponseEntity<>(categoryService.findAll(),HttpStatus.OK);
    }
    @GetMapping("/findAllByAmountMoney")
    public ResponseEntity<Double> findAllByAmountMoney(){
        return new ResponseEntity<>(transactionService.getAllByMoneyAmount(),HttpStatus.OK);
    }
    @GetMapping("/findAllByAmountMoney/{id}")
        public ResponseEntity<Double> findAllByAmountMoneyDetail(@PathVariable Long id){
        return new ResponseEntity<>(transactionService.getAllByMoneyAmount(id),HttpStatus.OK);
    }

    @GetMapping("/findAllByCreatedDate")
    public ResponseEntity<Iterable<Transaction>>findAllByCreatedDateBetween(@RequestParam("formTime") String fromTime,@RequestParam("toTime") String toTime){
        if(fromTime.equals("") && toTime.equals("")){
            fromTime = "1900-01-01T00:00:00";
            toTime = String.valueOf(LocalDateTime.now());
        }
        return new ResponseEntity<>(transactionService.findAllByCreatedDateBetween(LocalDateTime.parse(fromTime), LocalDateTime.parse(toTime)), HttpStatus.OK);
    }
}
