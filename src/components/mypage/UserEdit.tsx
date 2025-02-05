'use client';

import Header from '@/components/mypage/header/Header';
import { LoadingAnimation } from '@/components/mypage/LoadingAnimation';
import { useUserQuery } from '@/hooks/mypage/queries/useUserQuery';
import defaultProfile from '@images/mypage/profile-edit-default.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { useEditUserMutation } from '@/hooks/mypage/queries/useUserQuery';
import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import AuthSelect from '@/components/auth/AuthSelect';
import { cn } from '@/utils/auth/ui.util';
import { TAuthFormValues } from '@/types/auth/auth.type';
import { IUserEdit } from '@/types/mypage/user';

export default function UserEdit() {
  const { data, isLoading, error } = useUserQuery();
  const { mutate: editUser, isPending: isEditing } = useEditUserMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [emailInputValue, setEmailInputValue] = useState('');
  const [nicknameInputValue, setNicknameInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInputValue, setTagInputValue] = useState('');
  const [position, setPosition] = useState('');

  const [passwordInputValue, setPasswordInputValue] = useState('');

  const [isEmailInputExceeded, setIsEmailInputExceeded] = useState(false);
  const [isNicknameInputExceeded, setIsNicknameInputExceeded] = useState(false);
  const [isTextAreaExceeded, setIsTextAreaExceeded] = useState(false);
  const [isTagInputExceeded, setIsTagInputExceeded] = useState(false);
  const [isTagTextExceeded, setIsTagTextExceeded] = useState(false);

  const methods = useForm<TAuthFormValues>({
    defaultValues: {
      tags: [{ value: '' }],
    },
  });

  useEffect(() => {
    if (data) {
      setEmailInputValue(data.email || '');
      setNicknameInputValue(data.nickname || '');
      setPosition(data.position || '');
      setTextareaValue(data.introduction || '');
      setTags(data.tags || []);
    }
  }, [data]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const textAreaHandleInput = () => {
    const text = textareaValue;
    setIsTextAreaExceeded(text.length > 20);
  };

  const nicknameInputHandleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    if (text.length <= 8) {
      setNicknameInputValue(text);
      setIsNicknameInputExceeded(text.length > 8);
    } else {
      setIsNicknameInputExceeded(true);
    }
  };

  const emailInputHandleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    const emailValidation = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    setEmailInputValue(text);
    setIsEmailInputExceeded(!emailValidation.test(text));
  };

  const handleRemoveTag = (indexToRemove: number) => {
    setTags(tags?.filter((_, index) => index !== indexToRemove) || []);
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      //마지막 글자가 확정되지 않은 상태에서 엔터키를 누르면 글자가 다음 태그로 넘어가는 문제가 발생(IME(Input Method Editor) 이슈) 추가함.
      if (e.nativeEvent.isComposing) return;

      const newTag = tagInputValue.trim();
      if (newTag && !tags.includes(newTag) && tags.length < 3) {
        setTags([...tags, newTag]);
        setTagInputValue('');
        setIsTagInputExceeded(false);
      } else {
        setIsTagInputExceeded(true);
      }

      if (newTag.length > 5) {
        setIsTagTextExceeded(true);
      } else {
        setIsTagTextExceeded(false);
      }
    }
  };

  const handlePositionChange = (value: string) => {
    setPosition(value);
  };

  // const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const text = e.target.value;
  //   setPasswordInputValue(text);
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    const editData: IUserEdit = {
      email: emailInputValue,
      nickname: nicknameInputValue,
      introduction: textareaValue || '',
      tags: tags || [],
      password: passwordInputValue || '',
      position: position || '',
      image: image || undefined,
    };

    console.log('폼 제출 데이터:', editData);

    if (!editData.email || !editData.nickname || !editData.position) {
      console.error('필수 필드가 누락');
      return;
    }

    editUser(editData);
  };

  const isFormValid = tags.length > 0 && tags.length <= 3 && textareaValue;

  if (isLoading || isEditing) {
    return (
      <div className="flex flex-col gap-5 justify-center items-center h-screen">
        <LoadingAnimation />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-5 justify-center items-center h-screen">
        <p className="text-error">사용자 정보를 불러오는데 실패했습니다.</p>
        <Link href="/mypage" className="text-orange200">
          마이페이지로 돌아가기
        </Link>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col gap-5 justify-center items-center h-screen">
        <p>사용자 정보가 없습니다.</p>
        <Link href="/mypage" className="text-orange200">
          마이페이지로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="h-auto flex flex-col gap-4 mx-auto max-w-[584px] md:bg-background300 md:rounded-[32px] md:px-11 md:py-10 md:my-14 lg:my-10">
        <div className="py-10 px-4">
          <div className="flex flex-col items-center gap-6">
            <div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <Image
                src={previewImage || data?.image || defaultProfile}
                alt="profile"
                width={86}
                height={86}
                className="cursor-pointer rounded-full"
                onClick={handleImageClick}
              />
            </div>
            <Link
              href="/mypage/editPassword"
              className="text-label-normal font-medium text-orange200"
            >
              비밀번호 변경
            </Link>
          </div>

          <form className="flex flex-col gap-6 mt-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
              <label htmlFor="email" className="text-body-2-nomal font-medium text-gray-800">
                이메일 주소
              </label>
              <input
                type="text"
                id="email"
                placeholder="dothemeet@google.com"
                className={`rounded-xl bg-background400 px-4 py-[18px] placeholder:text-gray300 outline-none ${
                  isEmailInputExceeded ? 'border-2 border-error focus:border-error' : ''
                }`}
                value={emailInputValue}
                onChange={emailInputHandleInput}
                onInput={emailInputHandleInput}
              />
            </div>
            {isEmailInputExceeded && (
              <span
                className={`text-label-normal font-medium ${isEmailInputExceeded ? 'text-error' : 'text-gray300'}`}
              >
                이메일 형식으로 입력해주세요.
              </span>
            )}

            <div className="flex flex-col gap-3">
              <label htmlFor="nickName" className="text-body-2-nomal font-medium text-gray-800">
                닉네임
              </label>
              <div className="flex flex-col gap-1.5">
                <input
                  type="text"
                  id="nickName"
                  placeholder="두두씨"
                  className={`rounded-xl bg-background400 px-4 py-[18px] placeholder:text-gray300 outline-none ${
                    isNicknameInputExceeded ? 'border-2 border-error focus:border-error' : ''
                  }`}
                  value={nicknameInputValue}
                  onChange={nicknameInputHandleInput}
                  onInput={nicknameInputHandleInput}
                />
                <span
                  className={`text-label-normal font-medium ${
                    isNicknameInputExceeded ? 'text-error' : 'text-gray300'
                  }`}
                >
                  최대 8글자까지 입력 가능해요
                </span>
              </div>
            </div>

            {/* TODO: 비밀번호 수정 기능 추가 수정 필요 */}
            {/* <div className="flex flex-col gap-3">
              <label htmlFor="password" className="flex justify-start items-center gap-[2px]">
                <span className="text-body-2-nomal font-medium text-gray-800">비밀번호</span>
              </label>
              <input
                type="password"
                id="password"
                placeholder="비밀번호를 입력해주세요"
                className="rounded-xl bg-background400 px-4 py-[18px] placeholder:text-gray300 outline-none"
                value={passwordInputValue}
                onChange={handlePasswordChange}
              />
            </div> */}

            <div className="flex flex-col gap-3">
              <label htmlFor="position" className="flex justify-start items-center gap-[2px]">
                <span className="text-body-2-nomal font-medium text-gray-800">직군</span>
                <span className="text-body-2-nomal font-medium text-error pt-1">*</span>
              </label>
              <Controller
                name="position"
                control={methods.control}
                render={({ field: { onChange, value } }) => (
                  <AuthSelect
                    options={[
                      { value: 'PM', label: 'PM' },
                      { value: 'DESIGNER', label: '디자이너' },
                      { value: 'FRONTEND', label: '프론트 개발자' },
                      { value: 'BACKEND', label: '백엔드 개발자' },
                    ]}
                    className={cn(
                      'h-[54px]',
                      methods.formState.errors.position && 'focus-visible:ring-error',
                    )}
                    placeholder="직군을 선택해주세요"
                    value={position}
                    onChange={handlePositionChange}
                  />
                )}
                rules={{ required: '직군을 선택해주세요' }}
              />
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="textarea" className="text-body-2-nomal font-medium text-gray-800">
                소개
              </label>
              <div className="flex flex-col gap-1.5">
                <textarea
                  id="textarea"
                  value={textareaValue}
                  onChange={(e) => {
                    setTextareaValue(e.target.value);
                    setIsTextAreaExceeded(e.target.value.length >= 20);
                  }}
                  placeholder="소개를 입력해주세요"
                  className={`rounded-xl bg-background400 px-4 py-[18px] placeholder:text-gray300 resize-none outline-none ${
                    isTextAreaExceeded ? 'border-2 border-error focus:border-error' : ''
                  }`}
                  maxLength={20}
                />
                <span
                  className={`text-label-normal font-medium ${
                    isTextAreaExceeded ? 'text-error' : 'text-gray300'
                  }`}
                >
                  최대 20자까지 입력 가능해요
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <label htmlFor="tag" className="text-body-2-nomal font-medium text-gray-800">
                  태그
                </label>
                <div className="flex items-center gap-1.5">
                  <span className="text-gray600 font-medium text-caption-normal">
                    {tags.length}
                  </span>
                  <hr className="w-[1px] h-1.5 bg-gray300" />
                  <span className="text-gray300 font-medium text-caption-normal">3</span>
                </div>
              </div>
              <div className="relative flex flex-col gap-2">
                <div className="flex flex-wrap gap-2">
                  <input
                    type="text"
                    id="tag"
                    value={tagInputValue}
                    onChange={(e) => setTagInputValue(e.target.value)}
                    onKeyDown={handleTagInput}
                    maxLength={5}
                    placeholder="# 태그추가"
                    className="flex gap-2 items-center rounded-xl px-4 py-2 bg-background400 outline-none text-caption-normal font-medium placeholder:text-gray300 w-[90px] "
                  />

                  {tags?.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-4 bg-background400 rounded-xl justify-between"
                    >
                      <span
                        key={index}
                        className="inline-flex items-center text-caption-normal font-medium text-gray600 "
                      >
                        #{tag}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(index)}
                        className=" text-gray600 hover:text-gray950"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                {/* TODO: 태그 글자수 초과 시 에러 메시지 표시 수정 */}
                <span
                  className={`text-label-normal font-medium ${
                    isTagInputExceeded || isTagTextExceeded ? 'text-error' : 'text-gray300'
                  }`}
                >
                  {isTagInputExceeded
                    ? '최대 3개까지 입력 가능해요'
                    : isTagTextExceeded
                      ? '최대 5글자까지 입력 가능해요'
                      : ''}
                </span>
              </div>
            </div>
            <button
              type="submit"
              disabled={isEditing}
              className={`rounded-2xl px-[141px] py-[17px] ${
                isFormValid ? 'bg-orange200' : 'bg-gray950'
              }`}
            >
              <span
                className={`text-body-1-normal font-semibold ${
                  isFormValid ? 'text-white' : 'text-gray600'
                }`}
              >
                수정완료
              </span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
