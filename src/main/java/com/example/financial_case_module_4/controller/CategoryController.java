package com.example.financial_case_module_4.controller;

import com.example.financial_case_module_4.model.MoneyCategory;
import com.example.financial_case_module_4.model.Wallet;
import com.example.financial_case_module_4.service.moneyCategory.IMoneyCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/category")
public class   CategoryController {
    @Autowired
    IMoneyCategoryService categoryService;

    @GetMapping()
    public ResponseEntity<Iterable<MoneyCategory>> showMoneyCategory() {
         Iterable<MoneyCategory> moneyCategory = categoryService.findAll();
        return new ResponseEntity<>(moneyCategory, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<MoneyCategory> saveCategory(@RequestBody MoneyCategory moneyCategory) {
        return new ResponseEntity<>(categoryService.save(moneyCategory), HttpStatus.OK);
    }
    @GetMapping("/find-by-category-id/{id}")
    public ResponseEntity<Optional<MoneyCategory>> findAllByAppUserId(@PathVariable Long id) {
        Optional<MoneyCategory> moneyCategory = categoryService.findById(id);
        return new ResponseEntity<>(moneyCategory, HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<MoneyCategory> deleteCategory(@PathVariable Long id) {
        Optional<MoneyCategory> moneyCategory = categoryService.findById(id);
        if (!moneyCategory.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        categoryService.remove(id);
        return new ResponseEntity<>(moneyCategory.get(), HttpStatus.NO_CONTENT);
    }
    @PutMapping("/{id}")
    public ResponseEntity<MoneyCategory> editCategory(@PathVariable Long id, @RequestBody MoneyCategory category) {
        Optional<MoneyCategory> moneyCategory = categoryService.findById(id);
        if (!moneyCategory.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        category.setId(moneyCategory.get().getId());
        return new ResponseEntity<>(categoryService.save(category),HttpStatus.OK);
    }
}
