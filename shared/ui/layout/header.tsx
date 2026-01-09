"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCart } from "@/store/selectors/cart-selectors";
import { MiniCart } from "@/features/cart/ui/mini-cart";
import { RoundedBox } from "../rounded-block/rounded-block";
import { LocationIcon } from "../icons/location-icon";
import { WhatsAppIcon } from "../icons/whatsapp-icon";
import { TelegramIcon } from "../icons/tg-icon";
import { LogoIcon } from "../icons/logo-icon";
import { CatalogBtnIcon } from "../icons/catalog-btn-icon";
import SearchInput from "../search-input/search-input";
import { ProfileIcon } from "../icons/profile-icon";
import { FavoriteIcon } from "../icons/favorite-icon";
import { CartIcon } from "../icons/cart-icon";
import Link from "next/link";
import BurgerMenuButton from "../burger-menu-btn/burger-menu-btn";
import { PhonesContacts } from "../phones-contacts/phones-contacts";
import { ActionButton } from "../action-button/action-button";
import { SocialLink } from "../social-link/social-link";
import { MailContact } from "../mail-contact/mail-contact";
import { useMounted } from "@/shared/hooks/use-mounted";

const contacts = {
  email: "info@ekapak.ru",
  phones: ["+79068139777", "+79068136333"],
  telegram: "https://t.me/ekapak",
  whatsapp: "https://wa.me/79068139777",
};

export function Header() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { count } = useSelector(selectCart);
  const mounted = useMounted();

  return (
    <RoundedBox>
      <header>
        {/* MOBILE */}
        <div className="flex flex-col gap-2.5 xl:hidden">
          <div className="flex items-center">
            <Logo />
            <div className="ml-auto flex items-center gap-2.5">
              <MailContact email={contacts.email} isMobile />
              <PhonesContacts isMobile phones={contacts.phones} />
              <BurgerMenuButton
                className="flex xl:hidden header-mobile-btn"
                onClick={() => {
                  alert("open menu");
                }}
              />
            </div>
          </div>
          <SearchInput
            size="small"
            value={searchQuery}
            onChange={setSearchQuery}
            className="grow"
          />
        </div>

        {/* DESKTOP */}
        <div className="hidden xl:block">
          <div className="flex">
            <div className="flex gap-2.5 items-center">
              <LocationIcon />
              <span className="text-sm">
                г. Екатеринбург, ул. Старых Большевиков, 2А/2
              </span>
            </div>
            <div className="ml-auto flex gap-7.5 items-center">
              <div className="flex gap-4 items-center">
                <MailContact email={contacts.email} />

                <SocialLink
                  href="https://wa.me/79068139777"
                  icon={<WhatsAppIcon />}
                  label="WhatsApp"
                />

                <SocialLink
                  href="https://t.me/ekapak"
                  icon={<TelegramIcon />}
                  label="Telegram"
                />
              </div>

              <PhonesContacts phones={contacts.phones} />
            </div>
          </div>

          <div className="flex items-center mt-5">
            <Logo />

            <button
              className="h-13 flex gap-2.5 items-center rounded-sm bg-background py-3.5 px-5 text-lg font-bold ml-7.5"
              onClick={() => {
                alert("open catalog");
              }}
            >
              <CatalogBtnIcon />
              <span>Каталог</span>
            </button>

            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              className="grow ml-2.5"
            />

            <div className="items-center gap-7.5 ml-8.5 hidden xl:flex">
              <ActionButton
                icon={<ProfileIcon />}
                label="Профиль"
                onClick={() => {
                  alert("open profile");
                }}
              />
              <ActionButton
                icon={<FavoriteIcon />}
                label="Избранное"
                onClick={() => {
                  alert("open favorites");
                }}
              />
              <ActionButton
                icon={<CartIcon />}
                label="Корзина"
                badge={mounted ? count : undefined}
                onClick={() => {
                  alert("open favorites");
                }}
              />
            </div>

            <button
              className="h-13 gap-2.5 items-center rounded-sm bg-blue text-white py-3.5 px-5 text-lg font-bold ml-7.5 hidden xl:flex"
              onClick={() => {
                alert("order example");
              }}
            >
              Заказать образец
            </button>
          </div>
        </div>
      </header>

      <MiniCart open={open} onClose={() => setOpen(false)} />
    </RoundedBox>
  );
}

const Logo = () => {
  return (
    <Link href="/" aria-label="На главную">
      <LogoIcon className="font-semibold" />
    </Link>
  );
};
