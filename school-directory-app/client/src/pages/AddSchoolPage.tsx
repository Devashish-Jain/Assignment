import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
import SchoolForm from '../components/AddSchoolPage/SchoolForm';

// Zod validation schema
const schoolSchema = z.object({
  name: z.string().min(2, 'School name must be at least 2 characters').max(255, 'School name is too long'),
  address: z.string().min(10, 'Address must be at least 10 characters').max(500, 'Address is too long'),
  city: z.string().min(2, 'City name must be at least 2 characters').max(100, 'City name is too long'),
  state: z.string().min(2, 'State name must be at least 2 characters').max(100, 'State name is too long'),
  contact: z.number().min(1000000000, 'Contact number must be exactly 10 digits').max(9999999999, 'Contact number must be exactly 10 digits'),
  email_id: z.string().email('Please enter a valid email address').max(255, 'Email is too long'),
  images: z.array(z.instanceof(File))
    .min(1, 'At least one image is required')
    .max(10, 'Maximum 10 images allowed')
    .refine(
      (files) => files.every(file => file.size <= 5 * 1024 * 1024),
      'Each file must be less than 5MB'
    )
    .refine(
      (files) => files.every(file => ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)),
      'Only image files (JPEG, PNG, GIF, WebP) are allowed'
    )
});

export type SchoolFormData = z.infer<typeof schoolSchema>;

const AddSchoolPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const form = useForm<SchoolFormData>({
    resolver: zodResolver(schoolSchema),
    defaultValues: {
      name: '',
      address: '',
      city: '',
      state: '',
      contact: undefined,
      email_id: '',
      images: []
    },
    mode: 'onChange'
  });

  // Mutation for creating school
  const createSchoolMutation = useMutation({
    mutationFn: (data: SchoolFormData) => {
      return apiService.createSchool({
        name: data.name,
        address: data.address,
        city: data.city,
        state: data.state,
        contact: data.contact,
        email_id: data.email_id,
        images: data.images
      });
    },
    onSuccess: () => {
      // Invalidate and refetch schools data
      queryClient.invalidateQueries({ queryKey: ['schools'] });
      
      // Show success message
      setSubmitSuccess(true);
      
      // Reset form
      form.reset();
      
      // Navigate to schools page after delay
      setTimeout(() => {
        navigate('/schools');
      }, 2000);
    },
    onError: (error: Error) => {
      console.error('Failed to create school:', error);
      // Error is automatically handled by the form component
    }
  });

  const onSubmit = (data: SchoolFormData) => {
    createSchoolMutation.mutate(data);
  };

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  if (submitSuccess) {
    return (
      <motion.div
        className="min-h-screen pt-20 px-4 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="text-center card card-hover p-8 max-w-md mx-auto"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <motion.div
            className="text-6xl mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
          >
            ✅
          </motion.div>
          <motion.h2
            className="text-2xl font-bold gradient-text mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            School Added Successfully!
          </motion.h2>
          <motion.p
            className="text-dark-300 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Your school has been added to the directory. Redirecting to schools page...
          </motion.p>
          <motion.div
            className="w-full bg-dark-700 rounded-full h-2 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "linear", delay: 0.8 }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen pt-20"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div variants={containerVariants} initial="initial" animate="animate">
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold gradient-text font-display mb-6">
              Add New School
            </h1>
            <p className="text-xl text-dark-300 max-w-2xl mx-auto">
              Join our comprehensive educational directory. Add your school's information 
              and help students and families discover quality education.
            </p>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div 
            className="absolute top-20 left-10 w-20 h-20 rounded-full bg-gradient-to-r from-primary-500/20 to-secondary-500/20 blur-xl floating"
            variants={itemVariants}
            style={{ animationDelay: '0s' }}
          />
          <motion.div 
            className="absolute top-40 right-10 w-16 h-16 rounded-full bg-gradient-to-r from-secondary-500/20 to-primary-500/20 blur-xl floating"
            variants={itemVariants}
            style={{ animationDelay: '2s' }}
          />

          {/* Form Container */}
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
            <div className="card card-hover p-6 sm:p-8 lg:p-10">
              <SchoolForm
                form={form}
                onSubmit={onSubmit}
                isLoading={createSchoolMutation.isPending}
                error={createSchoolMutation.error?.message}
              />
            </div>
          </motion.div>

          {/* Guidelines */}
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto mt-8">
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-primary-400 mb-4 flex items-center">
                <span className="text-xl mr-2">💡</span>
                Guidelines for Adding Your School
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-dark-300">
                <div>
                  <h4 className="font-medium text-dark-200 mb-2">📝 Information Requirements</h4>
                  <ul className="space-y-1">
                    <li>• Provide complete and accurate school details</li>
                    <li>• Use official school name and contact information</li>
                    <li>• Enter 10-digit Indian phone number (without +91)</li>
                    <li>• Include full address with city and state</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-dark-200 mb-2">📸 Image Guidelines</h4>
                  <ul className="space-y-1">
                    <li>• Upload 1-10 high-quality school images</li>
                    <li>• Maximum 5MB per image</li>
                    <li>• Accepted formats: JPEG, PNG, GIF, WebP</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AddSchoolPage;
