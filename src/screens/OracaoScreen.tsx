import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Card, IconCircle, IconTextAction, ScreenContainer, SectionHeader } from '../components';
import { colors, radii, spacing, typography } from '../theme';
import { OracaoGuiada, PedidoOracao, oracoesGuiadas, pedidosDeOracaoIniciais, versiculoOracao } from '../data/prayerData';

const TINTS = [
  { bg: colors.tintPeach, icon: colors.tintPeachIcon },
  { bg: colors.tintSage, icon: colors.tintSageIcon },
  { bg: colors.tintLilac, icon: colors.tintLilacIcon },
];

// Tom usado apenas no texto/borda do botão "Excluir" na confirmação — não faz
// parte da paleta global do app, é só o sinal discreto de ação destrutiva.
const CONFIRM_DELETE_COLOR = '#B5483A';

type ModoPedido = 'ver' | 'editar' | 'excluir';

export function OracaoScreen() {
  const [pedidos, setPedidos] = useState<PedidoOracao[]>(pedidosDeOracaoIniciais);
  const [modalNovoAberto, setModalNovoAberto] = useState(false);
  const [pedidoVisualizandoId, setPedidoVisualizandoId] = useState<string | null>(null);
  const [modoPedido, setModoPedido] = useState<ModoPedido>('ver');
  const [categoriaAbertaId, setCategoriaAbertaId] = useState<string | null>(null);
  const [novoTitulo, setNovoTitulo] = useState('');
  const [novaDescricao, setNovaDescricao] = useState('');
  const [editTitulo, setEditTitulo] = useState('');
  const [editDescricao, setEditDescricao] = useState('');

  const pedidoVisualizando = pedidos.find((pedido) => pedido.id === pedidoVisualizandoId) ?? null;
  const categoriaAberta = oracoesGuiadas.find((categoria) => categoria.id === categoriaAbertaId) ?? null;

  const abrirPedido = (id: string) => {
    setPedidoVisualizandoId(id);
    setModoPedido('ver');
  };

  const fecharPedido = () => {
    setPedidoVisualizandoId(null);
    setModoPedido('ver');
  };

  const iniciarEdicao = () => {
    if (!pedidoVisualizando) return;
    setEditTitulo(pedidoVisualizando.titulo);
    setEditDescricao(pedidoVisualizando.descricao ?? '');
    setModoPedido('editar');
  };

  const salvarEdicao = () => {
    if (!editTitulo.trim() || !pedidoVisualizandoId) return;
    setPedidos((atual) =>
      atual.map((p) =>
        p.id === pedidoVisualizandoId
          ? { ...p, titulo: editTitulo.trim(), descricao: editDescricao.trim() || undefined }
          : p
      )
    );
    setModoPedido('ver');
  };

  const confirmarExclusao = () => {
    setPedidos((atual) => atual.filter((p) => p.id !== pedidoVisualizandoId));
    fecharPedido();
  };

  const abrirNovoPedido = () => {
    setNovoTitulo('');
    setNovaDescricao('');
    setModalNovoAberto(true);
  };

  const salvarNovoPedido = () => {
    if (!novoTitulo.trim()) return;
    const novoPedido: PedidoOracao = {
      id: Date.now().toString(),
      titulo: novoTitulo.trim(),
      descricao: novaDescricao.trim() || undefined,
      data: 'Hoje',
      respondida: false,
    };
    setPedidos((atual) => [novoPedido, ...atual]);
    setModalNovoAberto(false);
  };

  const alternarRespondida = (id: string) => {
    setPedidos((atual) => atual.map((p) => (p.id === id ? { ...p, respondida: !p.respondida } : p)));
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>Oração</Text>
      <Text style={styles.subtitle}>Fale com Deus e encontre paz.</Text>

      <Card variant="dark" style={styles.heroCard}>
        <View style={styles.heroIconWrap}>
          <MaterialCommunityIcons name="hands-pray" size={26} color={colors.gold400} />
        </View>
        <Text style={styles.heroLabel}>SEU MOMENTO DE ORAÇÃO</Text>
        <Text style={styles.heroText}>Fale com Deus com sinceridade. Ele ouve você.</Text>
        <Pressable
          onPress={abrirNovoPedido}
          style={({ pressed }) => [styles.heroButton, pressed && styles.heroButtonPressed]}
        >
          <Text style={styles.heroButtonLabel}>Começar uma oração</Text>
        </Pressable>
      </Card>

      <View style={styles.section}>
        <SectionHeader title="Meus pedidos de oração" actionLabel="+ Novo pedido" onActionPress={abrirNovoPedido} />
        <Card padded={false} style={styles.groupCard}>
          <View style={styles.groupInner}>
            {pedidos.map((pedido, index) => (
              <Pressable
                key={pedido.id}
                onPress={() => abrirPedido(pedido.id)}
                style={({ pressed }) => [
                  styles.pedidoRow,
                  index < pedidos.length - 1 && styles.pedidoRowDivider,
                  pressed && styles.pedidoRowPressed,
                ]}
              >
                <View style={styles.pedidoTextWrap}>
                  <Text style={styles.pedidoTitulo}>{pedido.titulo}</Text>
                  <Text style={styles.pedidoData}>{pedido.data}</Text>
                </View>
                {pedido.respondida ? (
                  <View style={styles.pedidoStatusRespondida}>
                    <MaterialCommunityIcons name="check" size={13} color={colors.white} />
                    <Text style={styles.pedidoStatusRespondidaLabel}>Respondida</Text>
                  </View>
                ) : (
                  <View style={styles.pedidoStatusPendente} />
                )}
              </Pressable>
            ))}
          </View>
        </Card>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Orações guiadas" />
        <View style={styles.guidedGrid}>
          {oracoesGuiadas.map((item, index) => {
            const tint = TINTS[index % TINTS.length];
            return (
              <Pressable
                key={item.id}
                onPress={() => setCategoriaAbertaId(item.id)}
                style={({ pressed }) => [styles.guidedItem, pressed && styles.guidedItemPressed]}
              >
                <IconCircle name={item.icon} backgroundColor={tint.bg} iconColor={tint.icon} size={56} iconSize={24} />
                <Text style={styles.guidedLabel}>{item.titulo}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <Card variant="dark" style={styles.verseCard}>
        <View style={styles.verseHeader}>
          <View style={styles.verseHeaderLeft}>
            <MaterialCommunityIcons name="hands-pray" size={16} color={colors.gold400} />
            <Text style={styles.verseLabel}>VERSÍCULO SOBRE ORAÇÃO</Text>
          </View>
          <Pressable hitSlop={8}>
            <MaterialCommunityIcons name="bookmark-outline" size={20} color={colors.gold400} />
          </Pressable>
        </View>

        <Text style={styles.verseText}>“{versiculoOracao.texto}”</Text>
        <Text style={styles.verseReference}>{versiculoOracao.referencia}</Text>

        <View style={styles.verseDivider} />

        <View style={styles.verseActions}>
          <IconTextAction icon="heart-outline" label="Salvar" color={colors.gold400} />
          <IconTextAction icon="share-variant-outline" label="Compartilhar" color={colors.gold400} />
        </View>
      </Card>

      <NovoPedidoModal
        visivel={modalNovoAberto}
        titulo={novoTitulo}
        descricao={novaDescricao}
        onMudarTitulo={setNovoTitulo}
        onMudarDescricao={setNovaDescricao}
        onFechar={() => setModalNovoAberto(false)}
        onSalvar={salvarNovoPedido}
      />

      <VerPedidoModal
        pedido={pedidoVisualizando}
        modo={modoPedido}
        editTitulo={editTitulo}
        editDescricao={editDescricao}
        onMudarEditTitulo={setEditTitulo}
        onMudarEditDescricao={setEditDescricao}
        onFechar={fecharPedido}
        onAlternarRespondida={alternarRespondida}
        onIniciarEdicao={iniciarEdicao}
        onSalvarEdicao={salvarEdicao}
        onCancelarModo={() => setModoPedido('ver')}
        onPedirExclusao={() => setModoPedido('excluir')}
        onConfirmarExclusao={confirmarExclusao}
      />

      <OracaoGuiadaModal categoria={categoriaAberta} onFechar={() => setCategoriaAbertaId(null)} />
    </ScreenContainer>
  );
}

function ModalHeader({ titulo, onFechar }: { titulo: string; onFechar: () => void }) {
  return (
    <View style={styles.modalHeader}>
      <Text style={styles.modalTitle}>{titulo}</Text>
      <Pressable style={styles.modalCloseButton} onPress={onFechar} hitSlop={8}>
        <MaterialCommunityIcons name="close" size={20} color={colors.navy700} />
      </Pressable>
    </View>
  );
}

function NovoPedidoModal({
  visivel,
  titulo,
  descricao,
  onMudarTitulo,
  onMudarDescricao,
  onFechar,
  onSalvar,
}: {
  visivel: boolean;
  titulo: string;
  descricao: string;
  onMudarTitulo: (valor: string) => void;
  onMudarDescricao: (valor: string) => void;
  onFechar: () => void;
  onSalvar: () => void;
}) {
  return (
    <Modal visible={visivel} animationType="slide" transparent onRequestClose={onFechar}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <ModalHeader titulo="Novo pedido de oração" onFechar={onFechar} />

          <Text style={styles.fieldLabel}>TÍTULO</Text>
          <TextInput
            style={styles.fieldInput}
            placeholder="Ex.: Saúde da minha mãe"
            placeholderTextColor={colors.ink400}
            value={titulo}
            onChangeText={onMudarTitulo}
          />

          <Text style={styles.fieldLabel}>O QUE ESTÁ ACONTECENDO?</Text>
          <TextInput
            style={[styles.fieldInput, styles.fieldTextArea]}
            placeholder="Escreva pelo que deseja orar..."
            placeholderTextColor={colors.ink400}
            value={descricao}
            onChangeText={onMudarDescricao}
            multiline
            textAlignVertical="top"
          />

          <Text style={styles.aiHint}>
            Em breve, o Luz Viva vai poder te ajudar a transformar isso em uma oração personalizada.
          </Text>

          <Pressable
            onPress={onSalvar}
            disabled={!titulo.trim()}
            style={({ pressed }) => [
              styles.saveButton,
              !titulo.trim() && styles.saveButtonDisabled,
              pressed && titulo.trim() && styles.saveButtonPressed,
            ]}
          >
            <Text style={styles.saveButtonLabel}>Salvar pedido</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

function VerPedidoModal({
  pedido,
  modo,
  editTitulo,
  editDescricao,
  onMudarEditTitulo,
  onMudarEditDescricao,
  onFechar,
  onAlternarRespondida,
  onIniciarEdicao,
  onSalvarEdicao,
  onCancelarModo,
  onPedirExclusao,
  onConfirmarExclusao,
}: {
  pedido: PedidoOracao | null;
  modo: 'ver' | 'editar' | 'excluir';
  editTitulo: string;
  editDescricao: string;
  onMudarEditTitulo: (valor: string) => void;
  onMudarEditDescricao: (valor: string) => void;
  onFechar: () => void;
  onAlternarRespondida: (id: string) => void;
  onIniciarEdicao: () => void;
  onSalvarEdicao: () => void;
  onCancelarModo: () => void;
  onPedirExclusao: () => void;
  onConfirmarExclusao: () => void;
}) {
  return (
    <Modal visible={!!pedido} animationType="slide" transparent onRequestClose={onFechar}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          {pedido && modo === 'ver' && (
            <>
              <ModalHeader titulo={pedido.titulo} onFechar={onFechar} />
              <Text style={styles.fieldLabel}>{pedido.data}</Text>
              <Text style={styles.pedidoDescricao}>
                {pedido.descricao ?? 'Nenhuma descrição adicionada para este pedido.'}
              </Text>

              <View style={styles.pedidoSecondaryActions}>
                <IconTextAction icon="pencil-outline" label="Editar" color={colors.ink600} onPress={onIniciarEdicao} />
                <IconTextAction
                  icon="trash-can-outline"
                  label="Excluir"
                  color={colors.ink600}
                  onPress={onPedirExclusao}
                />
              </View>

              <Pressable
                onPress={() => onAlternarRespondida(pedido.id)}
                style={({ pressed }) => [
                  styles.saveButton,
                  pedido.respondida && styles.toggleButtonRespondida,
                  pressed && styles.saveButtonPressed,
                ]}
              >
                <MaterialCommunityIcons
                  name={pedido.respondida ? 'check-circle' : 'check-circle-outline'}
                  size={18}
                  color={colors.white}
                  style={styles.toggleButtonIcon}
                />
                <Text style={styles.saveButtonLabel}>
                  {pedido.respondida ? 'Marcar como pendente' : 'Marcar como respondida'}
                </Text>
              </Pressable>
            </>
          )}

          {pedido && modo === 'editar' && (
            <>
              <ModalHeader titulo="Editar pedido" onFechar={onCancelarModo} />

              <Text style={styles.fieldLabel}>TÍTULO</Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Ex.: Saúde da minha mãe"
                placeholderTextColor={colors.ink400}
                value={editTitulo}
                onChangeText={onMudarEditTitulo}
              />

              <Text style={styles.fieldLabel}>O QUE ESTÁ ACONTECENDO?</Text>
              <TextInput
                style={[styles.fieldInput, styles.fieldTextArea]}
                placeholder="Escreva pelo que deseja orar..."
                placeholderTextColor={colors.ink400}
                value={editDescricao}
                onChangeText={onMudarEditDescricao}
                multiline
                textAlignVertical="top"
              />

              <View style={styles.buttonRow}>
                <Pressable
                  onPress={onCancelarModo}
                  style={({ pressed }) => [styles.outlineButton, pressed && styles.saveButtonPressed]}
                >
                  <Text style={styles.outlineButtonLabel}>Cancelar</Text>
                </Pressable>
                <Pressable
                  onPress={onSalvarEdicao}
                  disabled={!editTitulo.trim()}
                  style={({ pressed }) => [
                    styles.saveButton,
                    styles.buttonRowItem,
                    !editTitulo.trim() && styles.saveButtonDisabled,
                    pressed && editTitulo.trim() && styles.saveButtonPressed,
                  ]}
                >
                  <Text style={styles.saveButtonLabel}>Salvar alterações</Text>
                </Pressable>
              </View>
            </>
          )}

          {pedido && modo === 'excluir' && (
            <>
              <ModalHeader titulo="Excluir pedido" onFechar={onCancelarModo} />
              <Text style={styles.confirmTitle}>Excluir este pedido?</Text>
              <Text style={styles.confirmText}>Essa ação não poderá ser desfeita.</Text>

              <View style={styles.buttonRow}>
                <Pressable
                  onPress={onCancelarModo}
                  style={({ pressed }) => [styles.outlineButton, pressed && styles.saveButtonPressed]}
                >
                  <Text style={styles.outlineButtonLabel}>Cancelar</Text>
                </Pressable>
                <Pressable
                  onPress={onConfirmarExclusao}
                  style={({ pressed }) => [
                    styles.outlineButton,
                    styles.buttonRowItem,
                    styles.deleteButton,
                    pressed && styles.saveButtonPressed,
                  ]}
                >
                  <Text style={styles.deleteButtonLabel}>Excluir</Text>
                </Pressable>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

function OracaoGuiadaModal({ categoria, onFechar }: { categoria: OracaoGuiada | null; onFechar: () => void }) {
  return (
    <Modal visible={!!categoria} animationType="slide" transparent onRequestClose={onFechar}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          {categoria && (
            <>
              <ModalHeader titulo={categoria.titulo} onFechar={onFechar} />
              <Text style={styles.fieldLabel}>ORAÇÃO GUIADA · EXEMPLO</Text>
              <Card variant="dark" style={styles.guidedPrayerCard}>
                <Text style={styles.guidedPrayerText}>{categoria.oracaoExemplo}</Text>
              </Card>
              <Text style={styles.aiHint}>
                Este é um exemplo de oração. Em breve, o Luz Viva vai gerar orações personalizadas para você, a
                partir do que você escrever.
              </Text>
              <Pressable
                onPress={onFechar}
                style={({ pressed }) => [styles.saveButton, pressed && styles.saveButtonPressed]}
              >
                <Text style={styles.saveButtonLabel}>Amém</Text>
              </Pressable>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  title: {
    ...typography.h1,
    color: colors.ink900,
    paddingTop: spacing.lg,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.ink600,
    marginBottom: spacing.xxl,
  },
  heroCard: {
    alignItems: 'center',
    marginBottom: spacing.xxxl,
  },
  heroIconWrap: {
    width: 56,
    height: 56,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: 'rgba(198, 161, 91, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  heroLabel: {
    ...typography.label,
    color: colors.gold400,
    marginBottom: spacing.md,
  },
  heroText: {
    ...typography.verse,
    fontSize: 19,
    lineHeight: 28,
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  heroButton: {
    backgroundColor: colors.cream100,
    borderRadius: radii.pill,
    paddingVertical: spacing.md + 2,
    paddingHorizontal: spacing.xxl,
  },
  heroButtonPressed: {
    opacity: 0.85,
  },
  heroButtonLabel: {
    ...typography.bodyMedium,
    color: colors.navy800,
  },
  section: {
    marginBottom: spacing.xxxl,
  },
  groupCard: {
    overflow: 'hidden',
  },
  groupInner: {
    paddingHorizontal: spacing.lg,
  },
  pedidoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  pedidoRowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  pedidoRowPressed: {
    opacity: 0.6,
  },
  pedidoTextWrap: {
    flex: 1,
    marginRight: spacing.md,
  },
  pedidoTitulo: {
    ...typography.bodyMedium,
    color: colors.ink900,
    marginBottom: 2,
  },
  pedidoData: {
    ...typography.caption,
    color: colors.ink400,
  },
  pedidoStatusPendente: {
    width: 20,
    height: 20,
    borderRadius: radii.pill,
    borderWidth: 1.5,
    borderColor: colors.ink200,
  },
  pedidoStatusRespondida: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.tintSageIcon,
    borderRadius: radii.pill,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    gap: 4,
  },
  pedidoStatusRespondidaLabel: {
    ...typography.caption,
    fontSize: 11,
    color: colors.white,
  },
  guidedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  guidedItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  guidedItemPressed: {
    opacity: 0.7,
  },
  guidedLabel: {
    ...typography.caption,
    color: colors.ink600,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  verseCard: {
    marginBottom: spacing.xl,
  },
  verseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  verseHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verseLabel: {
    ...typography.label,
    color: colors.gold400,
    marginLeft: spacing.sm,
  },
  verseText: {
    ...typography.verse,
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  verseReference: {
    ...typography.bodyMedium,
    color: colors.gold400,
    textAlign: 'center',
  },
  verseDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.12)',
    marginVertical: spacing.lg,
  },
  verseActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xxxl,
  },
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.cream100,
    borderTopLeftRadius: radii.xl,
    borderTopRightRadius: radii.xl,
    padding: spacing.xxl,
    maxHeight: '88%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  modalTitle: {
    ...typography.h2,
    color: colors.ink900,
    flex: 1,
    marginRight: spacing.md,
  },
  modalCloseButton: {
    width: 36,
    height: 36,
    borderRadius: radii.pill,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  fieldLabel: {
    ...typography.label,
    color: colors.ink400,
    marginBottom: spacing.sm,
  },
  fieldInput: {
    ...typography.body,
    color: colors.ink900,
    backgroundColor: colors.white,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginBottom: spacing.lg,
  },
  fieldTextArea: {
    minHeight: 100,
  },
  pedidoDescricao: {
    ...typography.body,
    color: colors.ink900,
    marginBottom: spacing.xl,
  },
  aiHint: {
    ...typography.caption,
    color: colors.ink400,
    fontStyle: 'italic',
    marginBottom: spacing.xl,
  },
  saveButton: {
    flexDirection: 'row',
    backgroundColor: colors.navy800,
    borderRadius: radii.pill,
    paddingVertical: spacing.md + 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonDisabled: {
    opacity: 0.4,
  },
  saveButtonPressed: {
    opacity: 0.85,
  },
  saveButtonLabel: {
    ...typography.bodyMedium,
    color: colors.white,
  },
  toggleButtonRespondida: {
    backgroundColor: colors.tintSageIcon,
  },
  toggleButtonIcon: {
    marginRight: spacing.sm,
  },
  pedidoSecondaryActions: {
    flexDirection: 'row',
    gap: spacing.xxl,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  buttonRowItem: {
    flex: 1,
  },
  outlineButton: {
    flex: 1,
    borderRadius: radii.pill,
    borderWidth: 1.5,
    borderColor: colors.navy800,
    paddingVertical: spacing.md + 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineButtonLabel: {
    ...typography.bodyMedium,
    color: colors.navy800,
  },
  deleteButton: {
    borderColor: CONFIRM_DELETE_COLOR,
  },
  deleteButtonLabel: {
    ...typography.bodyMedium,
    color: CONFIRM_DELETE_COLOR,
  },
  confirmTitle: {
    ...typography.h3,
    color: colors.ink900,
    marginBottom: spacing.sm,
  },
  confirmText: {
    ...typography.body,
    color: colors.ink600,
    marginBottom: spacing.xl,
  },
  guidedPrayerCard: {
    marginBottom: spacing.lg,
  },
  guidedPrayerText: {
    ...typography.verse,
    fontSize: 17,
    lineHeight: 27,
    color: colors.white,
    textAlign: 'center',
  },
});
