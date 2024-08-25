'use client';
import { Button } from '@/components/Button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ToggleGroup';
import { IconFemale } from '@/components/icons/IconFemale';
import { IconMale } from '@/components/icons/IconMale';
import { useContext } from 'react';
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
import { useForm } from 'react-hook-form';
import { NameAndGenderProps, nameAndGenderSchema } from '@/schemas/PetRegister/NameAndGender';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@/components/Label';
import { InputMessage } from '@/components/Fields/InputMessage';

export function NameAndGender() {
  const { newPet } = useContext(PetRegisterContext);
  const { clickNextStep, clickPreviousStep, pet, setPet } = usePetRegisterSteps();

  const specieName = species[pet.specieName as keyof typeof species];

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
    clearErrors,
  } = useForm<NameAndGenderProps>({
    resolver: zodResolver(nameAndGenderSchema),
    criteriaMode: 'firstError',
    reValidateMode: 'onChange',
    mode: 'onBlur',
  });

  function handleClickPreviousStep() {
    clickPreviousStep();
  }

  function handleClickNextStep(data: NameAndGenderProps) {
    clickNextStep({
      ...newPet,
      gender: data.gender,
      petName: data.petName,
    });
  }

  function handleGenderChange(value: string) {
    setValue('gender', value, { shouldValidate: true });
    clearErrors('gender')
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
        Ficamos muito felizes em receber mais um {specieName} em nossa comunidade!
      </h3>

      <InputControl className="w-full">
        <span className="text-base text-center font-bold text-neutral-900">
          Qual o nome do seu companheiro?
        </span>
        <Label htmlFor="petName" className="text-xs">
          Nome:
        </Label>
        <Input
          type="text"
          id="petName"
          placeholder="Nome de seu Pet"
          variant="secondary"
          className="bg-white placeholder:text-sm"
          defaultValue={pet?.petName}
          {...register('petName')}
          required
        />
        {errors?.petName && (
          <InputMessage variant="error" message={errors.petName.message} />
        )}
      </InputControl>

      <div className="flex flex-col gap-2 ">
        <span className="text-center text-base">Qual o sexo de seu Pet?</span>
        <ToggleGroup
          type="single"
          defaultValue={getValues('gender')}
          onValueChange={handleGenderChange}
          className="gap-8"
        >
          <ToggleGroupItem
            value="M"
            className="flex flex-col gap-1 w-[120px] h-[120px] p-5 border-2 border-dashed bg-white border-gray-400 rounded-3xl text-gray-700 hover:bg-white hover:border-studio-600 hover:text-gray-700 data-[state=on]:bg-white data-[state=on]:border-solid data-[state=on]:border-studio-600 data-[state=on]:text-gray-700"
          >
            <IconMale size={60} />
            <span className="text-sm">Macho</span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="F"
            className="flex flex-col gap-1 w-[120px] h-[120px] p-5 border-2 border-dashed bg-white border-gray-400 rounded-3xl text-gray-700 hover:bg-white hover:border-studio-600 hover:text-gray-700 data-[state=on]:bg-white data-[state=on]:border-solid data-[state=on]:border-studio-600 data-[state=on]:text-gray-700"
          >
            <IconFemale size={60} />
            <span className="text-sm">Fêmea</span>
          </ToggleGroupItem>
        </ToggleGroup>
        {errors?.gender && (
          <InputMessage variant="error" message={errors.gender.message} />
        )}
      </div>

      <div className="mt-auto w-full flex justify-around">
        <Button
          variant="outline"
          className="font-bold"
          onClick={handleClickPreviousStep}
        >
          Voltar
        </Button>
        <Button
          className="font-bold"
          onClick={handleSubmit(handleClickNextStep)}
          disabled={!getValues('petName') || !getValues('gender')}
        >
          Continuar
        </Button>
      </div>
    </>
  );
}
