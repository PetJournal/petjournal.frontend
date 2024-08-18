'use client';
import { Button } from '@/components/Button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ToggleGroup';
import { IconFemale } from '@/components/icons/IconFemale';
import { IconMale } from '@/components/icons/IconMale';
import { ChangeEvent, useContext } from 'react';
import { PetRegisterContext } from '../context/PetRegisterContext';
import { usePetRegisterSteps } from './usePetRegisterSteps';
import { species } from '@/utils/species';
import { InputControl } from '@/components/Fields/InputControl';
import { Input } from '@/components/Fields/Input';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@/components/Breadcrump';
import Image from 'next/image';

export function NameAndGender() {
  const { newPet } = useContext(PetRegisterContext);
  const { error, clickNextStep, clickPreviousStep, setError, pet, setPet } =
    usePetRegisterSteps();

  const specieName = species[pet.specieName as keyof typeof species];

  function handleClickNextStep() {
    if (!pet.gender || !pet.petName) {
      clickNextStep(null);
      return;
    }
    clickNextStep({
      ...newPet,
      gender: pet.gender,
      petName: pet.petName,
    });
  }

  function handleClickPreviousStep() {
    clickPreviousStep();
  }

  function handleOnChangePetName(evt: ChangeEvent<HTMLInputElement>) {
    setError(false);
    const { value } = evt.target;

    setPet((state) => ({
      ...state,
      petName: value,
    }));
  }

  function handleOnChangeGender(value: string) {
    setError(false);
    setPet((state) => ({
      ...state,
      gender: value,
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
      <h3 className="text-xl font-bold text-left text-studio-600 w-full">
        <span className="block mb-4">Uau!</span>
        Ficamos muito felizes em receber mais um {specieName} em nossa
        comunidade!
      </h3>

      <InputControl className="w-full">
        <span className="text-base text-center ">
          Qual o nome do seu companheiro?
        </span>
        <label htmlFor="petName" className="text-xs">
          Nome:
        </label>
        <Input
          type="text"
          name="petName"
          id="petName"
          placeholder="Nome de seu Pet"
          variant="secondary"
          className="bg-white placeholder:text-sm"
          defaultValue={pet.petName}
          onChange={handleOnChangePetName}
          required
        />
        <span className="text-gray-400 text-xs">*Campo obrigatório</span>
      </InputControl>

      <div className="flex flex-col gap-2 ">
        <span className="text-center text-base">Qual o sexo de seu Pet?</span>
        <ToggleGroup
          type="single"
          defaultValue={pet.gender}
          onValueChange={handleOnChangeGender}
          className="gap-8"
        >
          <ToggleGroupItem
            value="M"
            className="flex flex-col gap-1 w-[120px] h-[120px] p-5 border-2 border-dashed bg-white border-gray-400 rounded-2xl text-gray-700 hover:bg-white hover:border-studio-600 hover:text-gray-700 data-[state=on]:bg-white data-[state=on]:border-solid data-[state=on]:border-studio-600 data-[state=on]:text-gray-700"
          >
            <IconMale size={60} />
            <span className="text-sm">Macho</span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="F"
            className="flex flex-col gap-1 w-[120px] h-[120px] p-5 border-2 border-dashed bg-white border-gray-400 rounded-2xl text-gray-700 hover:bg-white hover:border-studio-600 hover:text-gray-700 data-[state=on]:bg-white data-[state=on]:border-solid data-[state=on]:border-studio-600 data-[state=on]:text-gray-700"
          >
            <IconFemale size={60} />
            <span className="text-sm">Fêmea</span>
          </ToggleGroupItem>
        </ToggleGroup>
        <span className="text-gray-400 text-xs">*Campo obrigatório</span>
      </div>

      {error && (
        <span className="text-red-400 text-sm text-center">
          Preencha todas as informações...
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
