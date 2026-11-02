package com.placeprep.service;

import com.placeprep.model.Resource;
import com.placeprep.repository.ResourceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResourceService {

    private final ResourceRepository resourceRepository;

    public ResourceService(ResourceRepository resourceRepository) {
        this.resourceRepository = resourceRepository;
    }

    public List<Resource> getResources(String category, String type) {
        if (category != null && !category.isEmpty()) {
            return resourceRepository.findByCategory(category);
        }
        if (type != null && !type.isEmpty()) {
            return resourceRepository.findByType(type);
        }
        return resourceRepository.findAll();
    }
}
