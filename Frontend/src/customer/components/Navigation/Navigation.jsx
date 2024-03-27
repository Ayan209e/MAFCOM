import { Fragment, useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import categoryContext from '../../context/categorycontext';
import * as React from 'react';
// import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../auth/Action';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };


const navigation = {
  categories: [
    {
      id: 'men',
      name: 'Men',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
        },
        {
          name: 'Artwork Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
          imageAlt:
            'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            {
              name: 'Tops', href: `/men`, onClick: () => {
              }
            },
            { name: 'Pants', href: '/men' },
            { name: 'Sweaters', href: '/men' },
            { name: 'T-Shirts', href: '#' },
            { name: 'Jackets', href: '#' },
            { name: 'Activewear', href: '#' },
            { name: 'Browse All', href: '#' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Wallets', href: '#' },
            { name: 'Bags', href: '#' },
            { name: 'Sunglasses', href: '#' },
            { name: 'Hats', href: '#' },
            { name: 'Belts', href: '#' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Re-Arranged', href: '#' },
            { name: 'Counterfeit', href: '#' },
            { name: 'Full Nelson', href: '#' },
            { name: 'My Way', href: '#' },
          ],
        },
      ],
    },
    {
      id: 'women',
      name: 'Women',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '#' },
            { name: 'Dresses', href: '#' },
            { name: 'Pants', href: '#' },
            { name: 'Denim', href: '#' },
            { name: 'Sweaters', href: '#' },
            { name: 'T-Shirts', href: '#' },
            { name: 'Jackets', href: '#' },
            { name: 'Activewear', href: '#' },
            { name: 'Browse All', href: '#' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '#' },
            { name: 'Wallets', href: '#' },
            { name: 'Bags', href: '#' },
            { name: 'Sunglasses', href: '#' },
            { name: 'Hats', href: '#' },
            { name: 'Belts', href: '#' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Full Nelson', href: '#' },
            { name: 'My Way', href: '#' },
            { name: 'Re-Arranged', href: '#' },
            { name: 'Counterfeit', href: '#' },
            { name: 'Significant Other', href: '#' },
          ],
        },
      ],
    },

  ],
  pages: [
    { name: 'Children', href: "#", id: 'children' },
    { name: 'Electronics', href: '#', id: 'electronics' },
    { name: 'Stores', href: '#', id: 'store' }
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navigation() {
  const context = useContext(categoryContext)
  const { selectedCategory, setSelectedCategory } = context
  const [open, setOpen] = useState(false)
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);


  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(localStorage.getItem("jwt") != null);
  }, [])

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    dispatch(logout());
    setLoggedIn(false);
  };

  const handleSigninAndSignup = async (event) => {
    setLoggedIn(localStorage.getItem("jwt") != null);
  }


  return (
    <div className="bg-white z-50 ">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >

              {/* Dialog Box - Mobile View */}
              <Dialog.Panel className="relative z-40 flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected ? 'border-yellow-600 text-yellow-600' : 'border-transparent text-gray-900',
                              'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'
                            )
                          }
                          onClick={() => {
                            setSelectedCategory(category)
                            // console.log(selectedCategory)
                          }}
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel key={category.name} className="space-y-10 px-4 pb-8 pt-10">
                        <div className="grid grid-cols-2 gap-x-4">
                          {category.featured.map((item) => (
                            <div key={item.name} className="group relative text-sm">
                              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <img src={item.imageSrc} alt={item.imageAlt} className="object-cover object-center" />
                              </div>
                              <Link to={item.href} className="mt-6 block font-medium text-gray-900">
                                <span className="absolute inset-0 z-10" aria-hidden="true" />
                                {item.name}
                              </Link>
                              <p aria-hidden="true" className="mt-1">
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div>
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                              {section.name}
                            </p>
                            <ul
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {section.items.map((item) => (
                                <li key={item.name} className="flow-root">
                                  <Link to={`/${category.id}`} className="-m-2 block p-2 text-gray-500" onClick={() => {
                                    setSelectedCategory(category);
                                    // console.log(selectedCategory);
                                  }}>
                                    {item.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <Link to={`/${page.id}`} className="-m-2 block p-2 font-medium text-gray-900" onClick={() => {
                        setSelectedCategory(page);
                        // console.log(selectedCategory);
                      }}>
                        {page.name}
                      </Link>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-r border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    {(!loggedIn) ?
                      <Link to={"/signin"}>
                        <Button style={{ color: "goldenrod" }} onClick={handleSigninAndSignup}>Signin</Button>
                      </Link>
                      :
                      <div>
                        <Link to="/profile">
                          <Button style={{ color: "goldenrod" }} className="-m-2 block p-2 font-medium text-gray-900">Profile</Button>
                        </Link>
                      </div>
                    }

                  </div>

                  <div className="flow-root">
                    {(!loggedIn) ?
                      <Link to={"/signup"}>
                        <Button style={{ color: "goldenrod" }} onClick={handleSigninAndSignup}>Signup</Button>
                      </Link>
                      :
                      <div>
                        <Link to="/signin">
                          <Button style={{ color: "goldenrod" }} onClick={handleSubmit}>Logout</Button>
                        </Link>
                      </div>
                    }

                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6">
                  <Link to="#" className="-m-2 flex items-center p-2">
                    <img
                      src="https://tailwindui.com/img/flags/flag-india.svg"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-base font-medium text-gray-900">CAD</span>
                    <span className="sr-only">, change currency</span>
                  </Link>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-yellow-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over  Rs. 1000
        </p>

        <nav aria-label="Top" className="mx-auto  px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to="/" onClick={() => {
                  setSelectedCategory({ id: "all" })
                  // console.log(selectedCategory)
                }}>
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-8 w-auto"
                    src='data:image/png;base64,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'
                    alt='companyLogo'
                  />
                </Link>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? 'border-yellow-600 text-yellow-600'
                                  : 'border-transparent text-gray-700 hover:text-gray-800',
                                'relative z-50  -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500 z-50">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div key={item.name} className="group relative text-base sm:text-sm">
                                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-cover object-center"
                                            />
                                          </div>
                                          <Link to={`/${category.id}`} className="mt-6 block font-medium text-gray-900">
                                            <span className="absolute inset-0 z-10" aria-hidden="true" />
                                            {item.name}
                                          </Link>
                                          <p aria-hidden="true" className="mt-1">
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                            {section.name}
                                          </p>
                                          <ul
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li key={item.name} className="flex">
                                                <Link to={`/${category.id}`} className="hover:text-gray-800" onClick={() => {
                                                  setSelectedCategory(category);
                                                  // console.log(selectedCategory);
                                                }}>{item.name}</Link>
                                                {/* <Link to={`/${selectedCategory.id}`} className="hover:text-gray-800">
                                                  {item.name}
                                                </Link> */}
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <Link to={`/${page.id}`} key={page.name}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800" onClick={() => {
                        setSelectedCategory(page);
                        console.log(selectedCategory);
                      }}>{page.name}</Link>
                    // <Link
                    //   key={page.name}
                    //   to={page.href}
                    //   className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    // >
                    //   {page.name}
                    // </Link>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {(!loggedIn) ?
                    <Link to={"/signin"}>
                      <Button style={{ color: "goldenrod" }} onClick={handleSigninAndSignup}>Signin</Button>
                    </Link>
                    :
                    <div>
                      <Link to="/profile">
                        <Button style={{ color: "goldenrod" }}>Profile</Button>
                      </Link>
                    </div>
                  }
                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  {(!loggedIn) ?
                    <Link to={"/signup"}>
                      <Button style={{ color: "goldenrod" }} onClick={handleSigninAndSignup}>Signup</Button>
                    </Link>
                    :
                    <Link to={"/signin"}>
                      <div>
                        <Button style={{ color: "goldenrod" }} onClick={handleSubmit}>Logout</Button>
                      </div>
                    </Link>
                  }
                </div>

                <div className="hidden lg:ml-8 lg:flex">
                  <Link to="#" className="flex items-center text-gray-700 hover:text-gray-800">
                    <img
                      style={{ scale: "1.3" }}
                      src="data:image/png;base64,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"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium">IND</span>
                    <span className="sr-only">, change currency</span>
                  </Link>
                </div>

                {/* Search */}
                <div className="flex lg:ml-6">
                  <Link to="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                  </Link>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link to="/cart" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    {/* <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span> */}
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
