import {FormControl, FormDescription, FormItem, FormLabel, FormMessage} from '@/components/ui/form.tsx';
import React from 'react';

type SimpleFormItemProps = {
  label: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

const SimpleFormItem = ({label, description, children, className}: SimpleFormItemProps) => {
  return (
    <FormItem className={className}>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        {children}
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage/>
    </FormItem>
  );
};
export default SimpleFormItem;
