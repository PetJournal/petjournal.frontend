'use client';
import { Button } from '@/components/Button';
import Image from 'next/image';
import { useContext } from 'react';
import { PetRegisterContext } from '../context/PetRegisterContext';
import { usePetRegisterSteps } from './usePetRegisterSteps';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@/components/Breadcrump';

export function DefaultScreen() {
  const { nextStep, previousStep, resetPetNewsValues } =
    useContext(PetRegisterContext);
  const { user } = usePetRegisterSteps();

  function handleClickNextStep() {
    nextStep();
  }
  function handleClickPreviousStep() {
    resetPetNewsValues();
    previousStep();
  }

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/home-active.svg"
                  height={15}
                  width={13}
                  alt="Home Icon"
                />{' '}
                Cadastro Pet
              </div>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold text-center text-studio-600 w-full">
          Olá, {user?.firstName}!
        </h3>
        <p className="text-lg text-center text-studio-600 w-full">
          Sabemos o quanto o seu pet é especial, e estamos muito animados em
          recebê-los, venha se juntar a nossa comunidade de amantes de Pets,
          para melhor aproveitar a nossa plataforma.
        </p>
      </div>
      <Image
        src="images/pets-illustration.svg"
        alt="Pets ilustração"
        width={540}
        height={540}
        priority
        className="w-3/4 h-auto object-cover"
      />

      <div className="mt-auto w-full flex justify-around">
        <Button
          variant="outline"
          className="font-bold"
          onClick={handleClickPreviousStep}
        >
          Voltar
        </Button>
        <Button className="font-bold" onClick={handleClickNextStep}>
          Continuar
        </Button>
      </div>
    </>
  );
}
