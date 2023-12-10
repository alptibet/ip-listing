import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

type ButtonProps = {
  label: string;
};

type ButtonLinkProps = {
  label: string;
  url: string;
};

export function ButtonPrimary({ label }: ButtonProps) {
  return <Button>{label}</Button>;
}

export function ButtonSecondary({ label }: ButtonProps) {
  return <Button variant="secondary">{label}</Button>;
}

export function ButtonLink({ label, url }: ButtonLinkProps) {
  return (
    <Link href={url} className={buttonVariants({ variant: 'outline' })}>
      {label}
    </Link>
  );
}
