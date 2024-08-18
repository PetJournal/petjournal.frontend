'use client';
import { Button } from '@/components/Button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ToggleGroup';
import { IconCat } from '@/components/icons/IconCat';
import { IconDog } from '@/components/icons/IconDog';
import { useContext } from 'react';
import { PetRegisterContext } from '../context/PetRegisterContext';
import { usePetRegisterSteps } from './usePetRegisterSteps';

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@/components/Breadcrump';
import Image from 'next/image';

export function Specie() {
  const { newPet } = useContext(PetRegisterContext);
  const {
    error,
    clickNextStep,
    clickPreviousStep,
    setError,
    pet,
    setPet,
    user,
  } = usePetRegisterSteps();

  function handleClickNextStep() {
    if (!pet.specieName) {
      clickNextStep(null);
      return;
    }
    clickNextStep({
      ...newPet,
      specieName: pet.specieName,
    });
  }

  function handleClickPreviousStep() {
    clickPreviousStep();
  }

  function handleOnChangeValue(value: string) {
    setError(false);
    setPet((state) => ({
      ...state,
      specieName: value,
    }));
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
      <h3 className="text-xl font-bold text-studio-600 w-full text-center">
        Olá <span className="text-custom-pink">{user?.firstName}</span>,
        gostaríamos de saber qual a espécie do seu Pet:
      </h3>
      <ToggleGroup
        type="single"
        onValueChange={handleOnChangeValue}
        defaultValue={newPet.specieName}
        className="gap-4 mt-8"
      >
        <ToggleGroupItem
          value="dog"
          className="flex flex-col gap-1 w-[100px] h-[100px] p-5 border-2 border-gray-400 text-gray-400 hover:bg-transparent hover:border-studio-600 hover:text-studio-600 data-[state=on]:bg-transparent data-[state=on]:border-studio-600 data-[state=on]:text-studio-600 focus:border-sky-400 focus-visible:border-sky-400 focus:text-gray-400"
        >
          <IconDog size={60} />
          <span>Cachorro</span>
        </ToggleGroupItem>
        <ToggleGroupItem
          value="cat"
          className="flex flex-col gap-1 w-[100px] h-[100px] p-5 border-2 border-gray-400 text-gray-400 hover:bg-transparent hover:border-studio-600 hover:text-studio-600 data-[state=on]:bg-transparent data-[state=on]:border-studio-600 data-[state=on]:text-studio-600 focus:border-sky-400 focus-visible:border-sky-400 focus:text-gray-400"
        >
          <IconCat size={60} />
          <span>Gato</span>
        </ToggleGroupItem>
      </ToggleGroup>

      {error && (
        <span className="text-red-400 text-sm text-center">
          Selecione uma das espécies...
        </span>
      )}

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
