package com.example.fashion.service;

import com.example.fashion.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final MongoTemplate template;

    public ProductService(MongoTemplate template) {
        this.template = template;
    }

    public Page<Product> search(String q, String category, BigDecimal minPrice, BigDecimal maxPrice,
                                String color, String size, String sort, Pageable pageable) {
        Query query = new Query();

        java.util.List<Criteria> crit = new java.util.ArrayList<>();
        if (q != null && !q.isBlank()) {
            crit.add(new Criteria().orOperator(
                Criteria.where("name").regex(q, "i"),
                Criteria.where("description").regex(q, "i")
            ));
        }
        if (category != null && !category.isBlank()) {
            crit.add(Criteria.where("category").regex("^" + category + "$", "i"));
        }
        if (minPrice != null) crit.add(Criteria.where("price").gte(minPrice));
        if (maxPrice != null) crit.add(Criteria.where("price").lte(maxPrice));
        if (color != null && !color.isBlank()) crit.add(Criteria.where("colors").regex("^" + color + "$", "i"));
        if (size != null && !size.isBlank()) crit.add(Criteria.where("sizes").regex("^" + size + "$", "i"));

        if (!crit.isEmpty()) query.addCriteria(new Criteria().andOperator(crit.toArray(new Criteria[0])));

        if ("priceAsc".equalsIgnoreCase(sort)) query.with(Sort.by(Sort.Direction.ASC, "price"));
        else if ("priceDesc".equalsIgnoreCase(sort)) query.with(Sort.by(Sort.Direction.DESC, "price"));
        else if ("rating".equalsIgnoreCase(sort)) query.with(Sort.by(Sort.Direction.DESC, "rating"));

        long total = template.count(query, Product.class);
        query.with(pageable);
        List<Product> items = template.find(query, Product.class);
        return new PageImpl<>(items, pageable, total);
    }

    public List<String> categories() {
        return template.query(Product.class).distinct("category").as(String.class).all()
                .stream().sorted().collect(Collectors.toList());
    }
}
