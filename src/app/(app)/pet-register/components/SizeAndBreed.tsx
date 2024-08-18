'use client';
import { Button } from '@/components/Button';
import { useContext } from 'react';
import { PetRegisterContext } from '../context/PetRegisterContext';
import { usePetRegisterSteps } from './usePetRegisterSteps';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/Select';
import { ScrollArea } from '@/components/ScrollArea';
import Image from 'next/image';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@/components/Breadcrump';

export function SizeAndBreed() {
  const { newPet, breeds, sizes } = useContext(PetRegisterContext);
  const { error, clickNextStep, clickPreviousStep, setError, pet, setPet } =
    usePetRegisterSteps();

  function handleClickNextStep() {
    if (!pet.size || !pet.breedName) {
      clickNextStep(null);
      return;
    }
    clickNextStep({
      ...newPet,
      size: pet.size,
      breedName: pet.breedName,
    });
  }

  function handleClickPreviousStep() {
    setError(false);
    clickPreviousStep();
  }

  function handleOnChangeSize(value: string) {
    setError(false);

    setPet((state) => ({
      ...state,
      size: value,
    }));
  }

  function handleOnChangeBreed(value: string) {
    setError(false);

    setPet((state) => ({
      ...state,
      breedName: value,
    }));
  }

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <div className="flex items-center gap-2">
                <Image src="/images/home.svg" height={15} width={15} alt="" />{' '}
                Cadastro Pet
              </div>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Raça</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h3 className="text-xl font-medium text-left text-studio-600 w-full">
        <span className="block">Nos conte mais!</span>
        <span className="block">Qual a raça de {pet.petName}?</span>
      </h3>

      {breeds && sizes && (
        <div className="w-full flex flex-col gap-8 z-20">
          <label className="flex flex-col gap-1">
            <span>Porte</span>
            <Select onValueChange={handleOnChangeSize}>
              <SelectTrigger>
                <SelectValue placeholder="Porte do seu pet" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <ScrollArea className="h-[150px] mr-1">
                    {sizes.map((size) => (
                      <SelectItem key={size.id} value={size.name}>
                        {size.name}
                      </SelectItem>
                    ))}
                  </ScrollArea>
                </SelectGroup>
              </SelectContent>
            </Select>
          </label>

          {/* TODO: Adicionar a opção de outros */}
          <label className="flex flex-col gap-1">
            <span>Raça</span>
            <Select onValueChange={handleOnChangeBreed}>
              <SelectTrigger>
                <SelectValue placeholder="Porte do seu pet" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <ScrollArea className="h-[150px] mr-1">
                    {breeds.map((breed) => (
                      <SelectItem key={breed.id} value={breed.name}>
                        {breed.name}
                      </SelectItem>
                    ))}
                  </ScrollArea>
                </SelectGroup>
              </SelectContent>
            </Select>
          </label>
        </div>
      )}

      {!pet.specieName && (
        <div>
          Você não tem uma espécie definida. Volte para definir uma espécie de
          seu Pet.
        </div>
      )}

      {error && (
        <span className="text-red-400 text-sm text-center">
          Selecione e preencha todas as informações
        </span>
      )}

      <div className="flex justify-center h-[31vh]">
        <Image
          src="./images/animals.svg"
          height={245}
          width={177}
          alt="Pet Journal Logo"
          className="absolute size-64 z-10"
        />
        <Image
          src="./images/paws.svg"
          height={578}
          width={391}
          alt="Pet Journal Logo"
          className="absolute top-1/4"
        />
      </div>

      <div className="mt-auto w-full flex justify-around z-40">
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
