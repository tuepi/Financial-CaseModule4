package com.example.financial_case_module_4.controller;

import com.example.financial_case_module_4.model.MoneyType;
import com.example.financial_case_module_4.model.User;
import com.example.financial_case_module_4.model.Wallet;
import com.example.financial_case_module_4.security.jwt.JwtAuthenticationFilter;
import com.example.financial_case_module_4.service.login.UserService;
import com.example.financial_case_module_4.service.moneyType.IMoneyTypeService;
import com.example.financial_case_module_4.service.wallet.IWalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/wallets")
public class WalletController {
    @Autowired
    IWalletService   walletService;
    @Autowired
    UserService userService;
    @Autowired
    JwtAuthenticationFilter jwtAuthenticationFilter;

    @Autowired
    IMoneyTypeService moneyTypeService;

    @GetMapping("/users/findByUser/{id}")
    public ResponseEntity<Iterable<Wallet>> findAllByUserId(@PathVariable Long id) {
        Iterable<Wallet> wallets = walletService.findAllByUserId(id);
        return new ResponseEntity<>(wallets, HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity<Iterable<Wallet>> findAllWallet() {
        List<Wallet> wallets = (List<Wallet>) walletService.findAll();
        if (wallets.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(wallets, HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Wallet> findWalletById(@PathVariable Long id) {
        Optional<Wallet> walletOptional=walletService.findById(id);
        if (!walletOptional .isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(walletOptional.get(), HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<Wallet> saveWallet(@RequestBody Wallet wallet) {
        MoneyType moneyType=moneyTypeService.findById(wallet.getMoneyType().getId()).get();
        User user=userService.findById(wallet.getUser().getId()).get();
        moneyTypeService.save(moneyType);
        userService.save(user);
        return new ResponseEntity<>(walletService.save(wallet), HttpStatus.CREATED);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Wallet> updateWallet(@PathVariable Long id, @RequestBody Wallet wallet) {
        Optional<Wallet> walletOptional = walletService.findById(id);
        if (!walletOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        wallet.setId(walletOptional.get().getId());
        return new ResponseEntity<>(walletService.save(wallet), HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Wallet> deleteWallet(@PathVariable Long id) {
        Optional<Wallet> walletOptional = walletService.findById(id);
        if (!walletOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        walletService.remove(id);
        return new ResponseEntity<>(walletOptional.get(), HttpStatus.NO_CONTENT);
    }
    @GetMapping("/findAllByName")
    public ResponseEntity<Iterable<Wallet>>findAllByNameContaining(@RequestParam String name){
        List<Wallet> wallets = (List<Wallet>) walletService.findAllByNameContaining(name);
        if (wallets.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(wallets, HttpStatus.OK);
    }


}
