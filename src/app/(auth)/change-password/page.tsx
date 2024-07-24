import { ChangePasswordForm } from './components/ChangePasswordForm';
import { Logo } from '@/components/Logo';

export default function ChangePasswordPage() {
  return (
    <>
      <Logo scale='lg' />
      <h1 className="font-medium text-2xl mt-16">Criar uma nova senha?</h1>
      <div className="w-full max-w-sm m-auto">
        <ChangePasswordForm />
      </div>
    </>
  );
}
