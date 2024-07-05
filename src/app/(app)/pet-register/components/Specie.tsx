'use client';
import { Button } from '@/components/Button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ToggleGroup';
import { IconCat } from '@/components/icons/IconCat';
import { IconDog } from '@/components/icons/IconDog';
import { useContext, useState } from 'react';
import { PetRegisterContext } from '../context/PetRegisterContext';
import { usePetRegisterSteps } from './usePetRegisterSteps';

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
      <h3 className="text-xl font-medium text-left text-studio-600 w-full">
        Olá, <span className="text-custom-pink">{user?.firstName}</span>,
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
          className="flex flex-col gap-1 w-[100px] h-[100px] p-5 border-2 border-gray-400 text-gray-400 hover:bg-transparent hover:border-custom-purple hover:text-custom-purple data-[state=on]:bg-transparent data-[state=on]:border-custom-purple data-[state=on]:text-custom-purple focus:border-sky-400 focus-visible:border-sky-400 focus:text-gray-400"
        >
          <IconDog size={60} />
          <span>Cachorro</span>
        </ToggleGroupItem>
        <ToggleGroupItem
          value="cat"
          className="flex flex-col gap-1 w-[100px] h-[100px] p-5 border-2 border-gray-400 text-gray-400 hover:bg-transparent hover:border-custom-purple hover:text-custom-purple data-[state=on]:bg-transparent data-[state=on]:border-custom-purple data-[state=on]:text-custom-purple focus:border-sky-400 focus-visible:border-sky-400 focus:text-gray-400"
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
          className="border-custom-purple text-custom-purple"
          onClick={handleClickPreviousStep}
        >
          Voltar
        </Button>
        <Button onClick={handleClickNextStep}>Continuar</Button>
      </div>
    </>
  );
}
