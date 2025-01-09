import {useForm} from 'react-hook-form';
import {registerSchema, RegisterSchema} from '@/schemas/authSchema.ts';
import {zodResolver} from '@hookform/resolvers/zod';
import {Form, FormField} from '@/components/ui/form.tsx';
import {Button} from '@/components/ui/button.tsx';
import {Input} from '@/components/ui/input.tsx';
import SimpleFormItem from '@/components/forms/SimpleFormItem.tsx';

const RegisterForm = () => {
  const form = useForm<RegisterSchema>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterSchema) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({field}) => (
              <SimpleFormItem label="First Name">
                <Input
                  type="text"
                  placeholder="John"
                  aria-label="Enter your first name"
                  {...field}
                />
              </SimpleFormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({field}) => (
              <SimpleFormItem label="Last Name">
                <Input
                  type="text"
                  placeholder="Doe"
                  aria-label="Enter your last name"
                  {...field}
                />
              </SimpleFormItem>
            )}
          />
        </div>

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

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({field}) => (
            <SimpleFormItem label="Repeat Password">
              <Input
                type="password"
                placeholder="••••••••••••"
                aria-label="Repeat your password"
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
export default RegisterForm;
