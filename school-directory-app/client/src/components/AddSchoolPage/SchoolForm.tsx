import React, { useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { SchoolFormData } from '../../pages/AddSchoolPage';

interface SchoolFormProps {
  form: UseFormReturn<SchoolFormData>;
  onSubmit: (data: SchoolFormData) => void;
  isLoading: boolean;
  error?: string;
}

const SchoolForm: React.FC<SchoolFormProps> = ({
  form,
  onSubmit,
  isLoading,
  error
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    clearErrors
  } = form;

  const watchedImages = watch('images');

  // File upload handler
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    if (files.length > 10) {
      form.setError('images', { message: 'Maximum 10 images allowed' });
      return;
    }
    
    // Validate file sizes and types
    const invalidFiles = files.filter(file => 
      file.size > 5 * 1024 * 1024 || 
      !['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)
    );
    
    if (invalidFiles.length > 0) {
      form.setError('images', { 
        message: 'Some files are invalid. Ensure all files are images under 5MB.' 
      });
      return;
    }
    
    setValue('images', files);
    clearErrors('images');
  }, [form, setValue, clearErrors]);

  // Remove image handler
  const removeImage = useCallback((indexToRemove: number) => {
    const newImages = watchedImages.filter((_, index) => index !== indexToRemove);
    setValue('images', newImages);
    
    if (newImages.length === 0) {
      form.setError('images', { message: 'At least one image is required' });
    }
  }, [watchedImages, setValue, form]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const errorVariants = {
    initial: { opacity: 0, height: 0, marginTop: 0 },
    animate: { opacity: 1, height: 'auto', marginTop: 8 },
    exit: { opacity: 0, height: 0, marginTop: 0 }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Error Alert */}
      <AnimatePresence>
        {error && (
          <motion.div
            variants={errorVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-400"
          >
            <div className="flex items-center">
              <span className="text-xl mr-2">⚠️</span>
              <span className="font-medium">Error:</span>
              <span className="ml-2">{error}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* School Name */}
      <motion.div variants={itemVariants} className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-dark-200">
          School Name <span className="text-red-400">*</span>
        </label>
        <input
          {...register('name')}
          type="text"
          id="name"
          className="input-field"
          placeholder="Enter school name"
          disabled={isLoading}
        />
        <AnimatePresence>
          {errors.name && (
            <motion.p 
              variants={errorVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-red-400 text-sm"
            >
              {errors.name.message}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Address */}
      <motion.div variants={itemVariants} className="space-y-2">
        <label htmlFor="address" className="block text-sm font-medium text-dark-200">
          Full Address <span className="text-red-400">*</span>
        </label>
        <textarea
          {...register('address')}
          id="address"
          rows={3}
          className="input-field resize-none"
          placeholder="Enter complete address"
          disabled={isLoading}
        />
        <AnimatePresence>
          {errors.address && (
            <motion.p 
              variants={errorVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-red-400 text-sm"
            >
              {errors.address.message}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* City and State */}
      <motion.div variants={itemVariants} className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="city" className="block text-sm font-medium text-dark-200">
            City <span className="text-red-400">*</span>
          </label>
          <input
            {...register('city')}
            type="text"
            id="city"
            className="input-field"
            placeholder="Enter city"
            disabled={isLoading}
          />
          <AnimatePresence>
            {errors.city && (
              <motion.p 
                variants={errorVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="text-red-400 text-sm"
              >
                {errors.city.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-2">
          <label htmlFor="state" className="block text-sm font-medium text-dark-200">
            State <span className="text-red-400">*</span>
          </label>
          <input
            {...register('state')}
            type="text"
            id="state"
            className="input-field"
            placeholder="Enter state"
            disabled={isLoading}
          />
          <AnimatePresence>
            {errors.state && (
              <motion.p 
                variants={errorVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="text-red-400 text-sm"
              >
                {errors.state.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Contact and Email */}
      <motion.div variants={itemVariants} className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="contact" className="block text-sm font-medium text-dark-200">
            Contact Number <span className="text-red-400">*</span>
          </label>
          <input
            {...register('contact', { 
              setValueAs: (value: string) => value === '' ? undefined : parseInt(value)
            })}
            type="tel"
            id="contact"
            className="input-field"
            placeholder="Enter 10-digit contact number"
            disabled={isLoading}
          />
          <AnimatePresence>
            {errors.contact && (
              <motion.p 
                variants={errorVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="text-red-400 text-sm"
              >
                {errors.contact.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-2">
          <label htmlFor="email_id" className="block text-sm font-medium text-dark-200">
            Email Address <span className="text-red-400">*</span>
          </label>
          <input
            {...register('email_id')}
            type="email"
            id="email_id"
            className="input-field"
            placeholder="Enter email address"
            disabled={isLoading}
          />
          <AnimatePresence>
            {errors.email_id && (
              <motion.p 
                variants={errorVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="text-red-400 text-sm"
              >
                {errors.email_id.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Image Upload */}
      <motion.div variants={itemVariants} className="space-y-4">
        <label className="block text-sm font-medium text-dark-200">
          School Images <span className="text-red-400">*</span>
        </label>
        <div className="border-2 border-dashed border-dark-600 rounded-lg p-6 hover:border-primary-500 transition-colors duration-200">
          <div className="text-center">
            <div className="text-4xl mb-4">📸</div>
            <div className="mb-4">
              <label
                htmlFor="images"
                className="btn btn-primary px-6 py-3 cursor-pointer inline-flex items-center"
              >
                <span className="mr-2">📁</span>
                Choose Images
              </label>
              <input
                type="file"
                id="images"
                className="hidden"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                disabled={isLoading}
              />
            </div>
            <p className="text-sm text-dark-400">
              Upload 1-10 images • Max 5MB each • JPEG, PNG, GIF, WebP
            </p>
          </div>
        </div>

        {/* Image Previews */}
        <AnimatePresence>
          {watchedImages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
            >
              {watchedImages.map((file, index) => (
                <motion.div
                  key={`${file.name}-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="relative group"
                >
                  <div className="aspect-square bg-dark-700 rounded-lg overflow-hidden">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors duration-200"
                    disabled={isLoading}
                  >
                    ×
                  </button>
                  <div className="mt-1 text-xs text-dark-400 truncate">
                    {file.name}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {errors.images && (
            <motion.p 
              variants={errorVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-red-400 text-sm"
            >
              {errors.images.message}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Submit Button */}
      <motion.div variants={itemVariants} className="pt-6">
        <button
          type="submit"
          disabled={isLoading || !isValid}
          className="w-full btn btn-primary px-6 py-4 text-lg font-semibold relative overflow-hidden"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
              Creating School...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <span className="mr-2">➕</span>
              Add School to Directory
            </div>
          )}
          
          {/* Button hover effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-400 opacity-0"
            whileHover={{ opacity: 0.1 }}
            transition={{ duration: 0.3 }}
          />
        </button>
        
        {!isValid && (
          <p className="mt-2 text-sm text-dark-400 text-center">
            Please fill all required fields correctly to submit
          </p>
        )}
      </motion.div>
    </motion.form>
  );
};

export default SchoolForm;
