import { expect, test } from "@playwright/test";

test.describe("Home Page", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
    });

    test("deve ter o título correto", async ({ page }) => {
        await expect(page).toHaveTitle(/Corelab/);
    });

    test("deve exibir o nome da aplicação", async ({ page }) => {
        const welcomeMessage = page.locator("text=CoreNotes");
        await expect(welcomeMessage).toBeVisible();
    });

    test("deve filtrar notas corretamente", async ({ page }) => {
        await page.fill("input[placeholder=\"Pesquisar nota...\"]", "Magnam dolor labore.");
        const filteredNotes = page.locator(".notes-section.desktop  .notes-list .note-card");
        await expect(filteredNotes).toHaveCount(1);
    });

    test("deve adicionar uma nota aos favoritos", async ({ page }) => {
        const favoriteButton = page.locator(".others .note-card .star-button").first();
        await favoriteButton.click();
        const favoriteNotes = page.locator(".notes-section.favorite.desktop  .notes-list .note-card");
        await expect(favoriteNotes).toHaveCount(5);
    });

    test("deve remover uma nota dos favoritos", async ({ page }) => {
        const favoriteButton = page.locator(".favorite .note-card .star-button").first();
        await favoriteButton.click();
        const favoriteNotes = page.locator(".notes-section.favorite.desktop  .notes-list .note-card");
        await expect(favoriteNotes).toHaveCount(2);
    });

    test("deve editar uma nota", async ({ page }) => {
        const editButton = page.locator(".note-card .action-button.edit").first();
        await editButton.click();

        await page.fill("input[placeholder=\"Título\"]", "Eum autem in eveniet exercitationem. Teste");
        await page.fill("textarea", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Teste");
        const saveButton = page.locator(".note-update .mantine-active").first();
        await saveButton.click();

        const editedNote = page.locator(".note-card .note-title", { hasText: "Teste" }).first();
        await expect(editedNote).toBeVisible();
    });

    test("deve mudar a cor do card", async ({ page }) => {
        const colorPickerButton = page.locator(".action-button.color-picker-button").first();
        await colorPickerButton.click();

        const colorOption = page.locator(".color-option").first(); // Selecione a primeira opção de cor
        await colorOption.click();

        const noteCard = page.locator(".note-card").first();
        await expect(noteCard).toHaveClass(/note-/); // Verifique se a classe de cor foi aplicada
    });

    test("deve deletar uma nota", async ({ page }) => {
        const deleteButton = page.locator(".others .note-card .action-button.delete").first();
        await deleteButton.click();
        const notes = page.locator(".notes-section.others.desktop  .notes-list .note-card");
        await expect(notes).toHaveCount(3);
    });

    test("deve criar uma nota", async ({ page }) => {
        const addButton = page.locator(".header .mantine-active").first();
        await addButton.click();

        await page.fill("input[placeholder=\"Título\"]", "Eum autem in eveniet exercitationem. Nova nota");
        await page.fill(
            "textarea[placeholder=\"Criar nota...\"]",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nova nota");

        const saveButton = page.locator(".note-footer .mantine-active").first();
        await saveButton.click();

        const editedNote = page.locator(".note-card .note-title", { hasText: "Nova nota" }).first();
        await expect(editedNote).toBeVisible();
    });
});