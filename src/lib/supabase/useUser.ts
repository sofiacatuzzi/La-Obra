"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { supabaseConfigured } from "@/lib/supabase/env";
import type { UserRole } from "@/lib/schedule-types";

export type Profile = {
  id: string;
  role: UserRole;
  full_name: string;
  phone: string | null;
};

export function useSupabaseUser() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabaseConfigured) {
      setLoading(false);
      return;
    }

    const supabase = createClient();
    let active = true;

    async function loadProfile(userId: string) {
      const { data } = await supabase.from("profiles").select("*").eq("id", userId).single();
      if (active) setProfile(data as Profile | null);
    }

    supabase.auth.getUser().then(({ data }) => {
      if (!active) return;
      setUser(data.user);
      if (data.user) loadProfile(data.user.id);
      setLoading(false);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      setUser(session?.user ?? null);
      if (session?.user) {
        loadProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => {
      active = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
  }

  return { user, profile, loading, signOut };
}
