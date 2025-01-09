import {useForm} from 'react-hook-form';
import {loginSchema, LoginSchema} from '@/schemas/authSchema.ts';
import {zodResolver} from '@hookform/resolvers/zod';
import {Form, FormField} from '@/components/ui/form.tsx';
import {Button} from '@/components/ui/button.tsx';
import {Input} from '@/components/ui/input.tsx';
import SimpleFormItem from '@/components/forms/SimpleFormItem.tsx';

const LoginForm = () => {
  const form = useForm<LoginSchema>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchema) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
            <SimpleFormItem label="Email">
              <Input
                type="email"
                placeholder="johndoe@example.com"
                aria-label="Enter your email"
                {...field}
              />
            </SimpleFormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({field}) => (
            <SimpleFormItem label="Password">
              <Input
                type="password"
                placeholder="••••••••••••"
                aria-label="Enter your password"
                {...field}
              />
            </SimpleFormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
export default LoginForm;
