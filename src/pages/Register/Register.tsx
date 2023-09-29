import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { registerAccount } from 'src/apis/auth.api'
import Input from 'src/components/Input'
import { schema, Schema } from 'src/utils/rules'

type FormData = Schema
export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerAccount(body)
  })
  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        console.log(data)
      }
    })
  })

  return (
    <div className='bg-orange'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr:10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2-xl'>Đăng ký</div>
              <Input
                type='email'
                className='mt-8'
                register={register}
                name='email'
                placeholder='Email'
                errorMessage={errors.email?.message}
              />

              <Input
                type='password'
                className='mt-3'
                register={register}
                name='password'
                placeholder='Password'
                errorMessage={errors.password?.message}
              />

              <Input
                type='password'
                className='mt-3'
                register={register}
                name='confirm_password'
                placeholder='Confirm Password'
                errorMessage={errors.confirm_password?.message}
              />

              <div className='mt-3'>
                <button
                  type='submit'
                  className='button w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'
                >
                  Đăng ký
                </button>
              </div>
              <div className='mt-8 flex items-center justify-center '>
                <span className='text-gray-400'>Bạn đã có tài khoản ?</span>
                <Link className='text-red-400 ml-1' to='/login'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}