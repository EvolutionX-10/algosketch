import { create } from "zustand";

export const useMetadataStore = create<MetadataStore>((set) => ({}));

interface MetadataStore {}
