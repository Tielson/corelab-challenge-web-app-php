import { Burger, Button, Drawer, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createItem } from "../api/createItem";
import "../styles/Header.scss";
import { Note } from "../types/note";
import NoteCreator from "./NoteCreator";

interface HeaderProps {
  filterText: string;
  onFilterChange: (text: string) => void;
}

const Header = ({ filterText, onFilterChange }: HeaderProps) => {
  const [mobileMenuOpened, { open: openMobileMenu, close: closeMobileMenu }] = useDisclosure(false);
  const [opened, { open, close }] = useDisclosure(false);
  const queryClient = useQueryClient();

  const { mutate: createFn, isPending } = useMutation({
    mutationFn: async (note: Note) => {
      return await createItem(note);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      close();
    },
    onError(error) {
      console.log(error);
    }
  });


  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <div className="logo-icon">📝</div>
          <span className="logo-text">CoreNotes</span>
        </div>

        {/* Versão desktop da barra de pesquisa */}
        <div className="search-bar desktop-only">
          <input
            type="text"
            placeholder="Pesquisar nota..."
            value={filterText}
            onChange={(e) => onFilterChange(e.target.value)}
            className="filter-input"
          />
          <button className="search-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>

        {/* Botão de criar nota para desktop */}
        <Button
          gradient={{ from: "cyan", to: "red", deg: 167 }}
          variant="gradient"
          onClick={open}
          className="desktop-only create-note-btn"
        >
          Criar nota
        </Button>

        {/* Botão de menu mobile */}
        <Burger
          opened={mobileMenuOpened}
          onClick={openMobileMenu}
          className="mobile-only burger-menu"
          size="sm"
          color="#455a64"
        />

        {/* Modal para criar nota */}
        <Modal opened={opened} onClose={close} title="Criar Nota" centered>
          <NoteCreator onAddNote={createFn} isPending={isPending} />
        </Modal>

        {/* Menu mobile */}
        <Drawer opened={mobileMenuOpened} onClose={closeMobileMenu} title="Menu" position="right" size="70%">
          <div className="mobile-menu-content">
            <div className="mobile-search">
              <input
                type="text"
                placeholder="Pesquisar nota..."
                value={filterText}
                onChange={(e) => onFilterChange(e.target.value)}
                className="filter-input"
              />
            </div>

            <Button
              gradient={{ from: "cyan", to: "red", deg: 167 }}
              variant="gradient"
              onClick={() => {
                closeMobileMenu();
                open();
              }}
              fullWidth
              className="mobile-create-btn"
            >
              Criar nota
            </Button>
          </div>
        </Drawer>
      </div>
    </header>
  );
};

export default Header;
