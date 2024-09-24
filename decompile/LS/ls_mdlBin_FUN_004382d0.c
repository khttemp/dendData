
/* WARNING: Function: __RTC_CheckEsp replaced with injection: __RTC_CheckEsp */
/* WARNING: Removing unreachable block (ram,0x00438e9e) */
/* WARNING: Removing unreachable block (ram,0x00439128) */
/* WARNING: Removing unreachable block (ram,0x00439011) */
/* WARNING: Removing unreachable block (ram,0x0043aaab) */
/* WARNING: Removing unreachable block (ram,0x00438478) */
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined8 __fastcall FUN_004382d0(void **param_1,undefined4 param_2,int param_3)

{
  undefined4 uVar1;
  char cVar2;
  bool bVar3;
  float *pfVar4;
  void *pvVar5;
  int *piVar6;
  void **ppvVar7;
  undefined3 extraout_var;
  Matrix *pMVar8;
  Vector3D *pVVar9;
  int iVar10;
  int *piVar11;
  undefined4 *puVar12;
  int iVar13;
  uint uVar14;
  undefined4 extraout_ECX;
  undefined4 extraout_ECX_00;
  undefined4 extraout_ECX_01;
  undefined4 extraout_ECX_02;
  undefined4 extraout_ECX_03;
  void *extraout_ECX_04;
  void *extraout_ECX_05;
  void *extraout_ECX_06;
  undefined4 extraout_ECX_07;
  undefined extraout_DL;
  uint uVar15;
  undefined4 extraout_EDX;
  undefined4 extraout_EDX_00;
  int extraout_EDX_01;
  undefined4 extraout_EDX_02;
  float *extraout_EDX_03;
  undefined4 extraout_EDX_04;
  undefined4 extraout_EDX_05;
  undefined4 extraout_EDX_06;
  int extraout_EDX_07;
  undefined4 extraout_EDX_08;
  undefined4 extraout_EDX_09;
  float10 extraout_ST0;
  float10 fVar16;
  ulonglong uVar17;
  undefined8 uVar18;
  float fVar19;
  CBox in_stack_fffffb60;
  undefined in_stack_fffffb64;
  undefined in_stack_fffffb68;
  undefined in_stack_fffffb6c;
  undefined in_stack_fffffb70;
  undefined in_stack_fffffb74;
  undefined in_stack_fffffb78;
  undefined in_stack_fffffb7c;
  float fVar20;
  int iVar21;
  Vector3D VVar22;
  undefined uVar23;
  undefined uVar24;
  undefined2 uVar25;
  undefined2 uVar26;
  undefined2 uVar27;
  undefined4 uVar28;
  Vector3D local_34c [16];
  Vector3D local_33c [12];
  Vector3D local_330 [20];
  Vector3D local_31c [12];
  Vector3D local_310 [28];
  Vector3D local_2f4 [12];
  Vector3D local_2e8 [12];
  Vector3D local_2dc [12];
  Vector3D local_2d0 [12];
  Vector3D local_2c4 [12];
  Vector3D local_2b8 [12];
  Vector3D local_2ac [12];
  Vector3D local_2a0 [12];
  Vector3D local_294 [12];
  Vector3D local_288 [12];
  Vector3D local_27c [24];
  Vector3D local_264 [12];
  Vector3D local_258 [16];
  Vector3D local_248 [12];
  int local_23c;
  undefined4 local_234;
  undefined4 local_230;
  undefined4 local_22c;
  float local_220;
  float local_21c;
  float local_218;
  float local_210;
  float local_20c;
  float local_208;
  undefined4 local_200;
  void *local_1fc;
  undefined4 local_1f8;
  float local_1f0;
  float local_1ec;
  float local_1e8;
  float local_1e4;
  float local_1e0;
  float local_1dc;
  int local_1d8;
  int local_1d0;
  float local_1c4 [3];
  float local_1b8 [3];
  Matrix local_1ac [72];
  CBox local_164 [220];
  int local_88;
  int local_84;
  int local_80;
  float local_7c;
  undefined4 local_78;
  float local_74;
  undefined4 local_70;
  Vector3D local_68 [20];
  void *local_54;
  void *local_50;
  void *local_4c;
  int local_44;
  int local_40;
  int local_3c;
  int local_38;
  int local_34;
  int local_30;
  void *local_2c;
  float local_28;
  float local_24;
  float local_1c;
  float local_18;
  float local_14;
  float local_c;
  void **local_8;
  
  uVar17 = CONCAT44(param_2,param_1);
  puVar12 = (undefined4 *)&stack0xfffffc50;
  for (iVar13 = 0xeb; iVar13 != 0; iVar13 = iVar13 + -1) {
    *puVar12 = 0xcccccccc;
    puVar12 = puVar12 + 1;
  }
  local_8 = param_1;
  if (param_1[1] == (void *)0x0) goto LAB_0043aaf8;
  uVar15 = (uint)*(short *)(param_3 + 2);
  if (uVar15 < 0xb7) {
    uVar17 = CONCAT44(uVar15,uVar15);
    uVar14 = (uint)(&switchD_0043832a::switchdataD_0043acfc)[uVar15];
    uVar25 = (undefined2)((uint)param_3 >> 0x10);
    switch(uVar15) {
    case 0:
      uVar17 = FUN_004d0340(uVar14,param_3);
      local_8[100] = (void *)uVar17;
      break;
    case 1:
      thunk_FUN_004146a0(param_1 + 0xc1,0,**(undefined4 **)(param_3 + 4),
                         *(undefined4 *)(*(int *)(param_3 + 4) + 8),
                         *(undefined4 *)(*(int *)(param_3 + 4) + 0x10));
      uVar17 = thunk_FUN_004146a0(local_8 + 199,0,*(undefined4 *)(*(int *)(param_3 + 4) + 4),
                                  *(undefined4 *)(*(int *)(param_3 + 4) + 0xc),
                                  *(undefined4 *)(*(int *)(param_3 + 4) + 0x10));
      break;
    case 2:
      uVar17 = thunk_FUN_00435b60(param_1 + 0x8b,0,**(undefined4 **)(param_3 + 4),
                                  *(undefined4 *)(*(int *)(param_3 + 4) + 4),
                                  *(undefined4 *)(*(int *)(param_3 + 4) + 8));
      break;
    case 3:
      uVar17 = thunk_FUN_004380e0(param_1);
      break;
    case 4:
      thunk_FUN_00441500(param_1,0x1c,'\0');
      thunk_FUN_00441500(local_8,0x20,'\x01');
      local_c = **(float **)(param_3 + 4);
      bVar3 = thunk_FUN_00417750(local_8,0x10000);
      if (bVar3) {
        local_c = local_c * -1.0;
      }
      thunk_FUN_00441600(local_8 + 10,local_c,*(float *)(*(int *)(param_3 + 4) + 4),
                         *(float *)(*(int *)(param_3 + 4) + 8));
      thunk_FUN_00414080(local_8 + 0x67,0,local_c,0);
      thunk_FUN_00414080(local_8 + 0x6d,0,*(undefined4 *)(*(int *)(param_3 + 4) + 4),0);
      uVar17 = thunk_FUN_00414080(local_8 + 0x73,0,*(undefined4 *)(*(int *)(param_3 + 4) + 8),0);
      break;
    case 5:
      thunk_FUN_00435a80(param_1 + 0x8b,0,**(undefined4 **)(param_3 + 4),
                         **(undefined4 **)(param_3 + 4),*(undefined4 *)(*(int *)(param_3 + 4) + 0xc)
                        );
      thunk_FUN_00435ac0(local_8 + 0x8b,0,*(undefined4 *)(*(int *)(param_3 + 4) + 4),
                         *(undefined4 *)(*(int *)(param_3 + 4) + 4),
                         *(undefined4 *)(*(int *)(param_3 + 4) + 0xc));
      uVar17 = thunk_FUN_00435b10(local_8 + 0x8b,0,*(undefined4 *)(*(int *)(param_3 + 4) + 8),
                                  *(undefined4 *)(*(int *)(param_3 + 4) + 8),
                                  *(undefined4 *)(*(int *)(param_3 + 4) + 0xc));
      break;
    case 6:
      thunk_FUN_00441500(param_1,0x1c,'\x01');
      thunk_FUN_00441500(local_8,0x20,'\x01');
      local_28 = **(float **)(param_3 + 4);
      bVar3 = thunk_FUN_00417750(local_8,0x10000);
      if (bVar3) {
        local_28 = local_28 * -1.0;
      }
      thunk_FUN_00414080(local_8 + 0x67,0,local_28,*(undefined4 *)(*(int *)(param_3 + 4) + 0xc));
      thunk_FUN_00414080(local_8 + 0x6d,0,*(undefined4 *)(*(int *)(param_3 + 4) + 4),
                         *(undefined4 *)(*(int *)(param_3 + 4) + 0xc));
      uVar17 = thunk_FUN_00414080(local_8 + 0x73,0,*(undefined4 *)(*(int *)(param_3 + 4) + 8),
                                  *(undefined4 *)(*(int *)(param_3 + 4) + 0xc));
      break;
    case 7:
      if (*param_1 == (void *)0x0) {
        MessageBoxA((HWND)0x0,&DAT_0053fe84,"ERROR",0x10);
        _printf(&DAT_0053fe90);
        _printf("ASSERT : %4d, %s\n");
        _DAT_00000001 = 0xbadc0de;
      }
      uVar17 = thunk_FUN_004172f0(*local_8);
      break;
    default:
      goto LAB_0043aaad;
    case 10:
      uVar17 = thunk_FUN_00441500(param_1,0x100,'\x01');
      break;
    case 0xb:
      uVar17 = thunk_FUN_00441500(param_1,0x100,'\0');
      break;
    case 0xc:
      uVar17 = FUN_004d0340(*(undefined4 *)(param_3 + 4),uVar15);
      uVar17 = thunk_FUN_0043adc0(local_8,(void *)uVar17);
      break;
    case 0xd:
      uVar28 = *(undefined4 *)(*(int *)(param_3 + 4) + 8);
      uVar1 = *(undefined4 *)(*(int *)(param_3 + 4) + 4);
      uVar26 = (undefined2)uVar1;
      uVar27 = (undefined2)((uint)uVar1 >> 0x10);
      uVar1 = **(undefined4 **)(param_3 + 4);
      VVar22 = SUB41(uVar1,0);
      uVar23 = (undefined)((uint)uVar1 >> 8);
      uVar25 = (undefined2)((uint)uVar1 >> 0x10);
      uVar17 = FUN_004d0340(*(undefined4 *)(param_3 + 4),*(undefined4 **)(param_3 + 4));
      uVar17 = thunk_FUN_004146a0(local_8 + 0x24,(int)uVar17,
                                  CONCAT22(uVar25,CONCAT11(uVar23,VVar22)),CONCAT22(uVar27,uVar26),
                                  uVar28);
      break;
    case 0xe:
      uVar28 = *(undefined4 *)(*(int *)(param_3 + 4) + 8);
      uVar1 = *(undefined4 *)(*(int *)(param_3 + 4) + 4);
      uVar26 = (undefined2)uVar1;
      uVar27 = (undefined2)((uint)uVar1 >> 0x10);
      uVar1 = **(undefined4 **)(param_3 + 4);
      VVar22 = SUB41(uVar1,0);
      uVar23 = (undefined)((uint)uVar1 >> 8);
      uVar25 = (undefined2)((uint)uVar1 >> 0x10);
      uVar17 = FUN_004d0340(*(undefined4 **)(param_3 + 4),param_3);
      uVar17 = thunk_FUN_004146a0(local_8 + 0x2a,(int)uVar17,
                                  CONCAT22(uVar25,CONCAT11(uVar23,VVar22)),CONCAT22(uVar27,uVar26),
                                  uVar28);
      break;
    case 0xf:
      uVar28 = *(undefined4 *)(*(int *)(param_3 + 4) + 8);
      uVar1 = *(undefined4 *)(*(int *)(param_3 + 4) + 4);
      uVar26 = (undefined2)uVar1;
      uVar27 = (undefined2)((uint)uVar1 >> 0x10);
      uVar1 = **(undefined4 **)(param_3 + 4);
      VVar22 = SUB41(uVar1,0);
      uVar23 = (undefined)((uint)uVar1 >> 8);
      uVar25 = (undefined2)((uint)uVar1 >> 0x10);
      uVar17 = FUN_004d0340(param_3,*(undefined4 *)(param_3 + 4));
      uVar17 = thunk_FUN_004146a0(local_8 + 0x30,(int)uVar17,
                                  CONCAT22(uVar25,CONCAT11(uVar23,VVar22)),CONCAT22(uVar27,uVar26),
                                  uVar28);
      break;
    case 0x10:
      uVar28 = *(undefined4 *)(*(int *)(param_3 + 4) + 8);
      uVar1 = *(undefined4 *)(*(int *)(param_3 + 4) + 4);
      uVar26 = (undefined2)uVar1;
      uVar27 = (undefined2)((uint)uVar1 >> 0x10);
      uVar1 = **(undefined4 **)(param_3 + 4);
      VVar22 = SUB41(uVar1,0);
      uVar23 = (undefined)((uint)uVar1 >> 8);
      uVar25 = (undefined2)((uint)uVar1 >> 0x10);
      uVar17 = FUN_004d0340(*(undefined4 *)(param_3 + 4),*(undefined4 **)(param_3 + 4));
      uVar17 = thunk_FUN_004146a0(local_8 + 0x36,(int)uVar17,
                                  CONCAT22(uVar25,CONCAT11(uVar23,VVar22)),CONCAT22(uVar27,uVar26),
                                  uVar28);
      break;
    case 0x11:
      uVar28 = *(undefined4 *)(*(int *)(param_3 + 4) + 8);
      uVar1 = *(undefined4 *)(*(int *)(param_3 + 4) + 4);
      uVar26 = (undefined2)uVar1;
      uVar27 = (undefined2)((uint)uVar1 >> 0x10);
      uVar1 = **(undefined4 **)(param_3 + 4);
      VVar22 = SUB41(uVar1,0);
      uVar23 = (undefined)((uint)uVar1 >> 8);
      uVar25 = (undefined2)((uint)uVar1 >> 0x10);
      uVar17 = FUN_004d0340(*(undefined4 **)(param_3 + 4),param_3);
      uVar17 = thunk_FUN_004146a0(local_8 + 0x3c,(int)uVar17,
                                  CONCAT22(uVar25,CONCAT11(uVar23,VVar22)),CONCAT22(uVar27,uVar26),
                                  uVar28);
      break;
    case 0x12:
      uVar28 = *(undefined4 *)(*(int *)(param_3 + 4) + 8);
      uVar1 = *(undefined4 *)(*(int *)(param_3 + 4) + 4);
      uVar26 = (undefined2)uVar1;
      uVar27 = (undefined2)((uint)uVar1 >> 0x10);
      uVar1 = **(undefined4 **)(param_3 + 4);
      VVar22 = SUB41(uVar1,0);
      uVar23 = (undefined)((uint)uVar1 >> 8);
      uVar25 = (undefined2)((uint)uVar1 >> 0x10);
      uVar17 = FUN_004d0340(param_3,*(undefined4 *)(param_3 + 4));
      uVar17 = thunk_FUN_004146a0(local_8 + 0x42,(int)uVar17,
                                  CONCAT22(uVar25,CONCAT11(uVar23,VVar22)),CONCAT22(uVar27,uVar26),
                                  uVar28);
      break;
    case 0x19:
      iVar13 = thunk_FUN_00441310((undefined4 *)param_1[6]);
      if (iVar13 == 0) {
        MessageBoxA((HWND)0x0,&DAT_0053fed4,"ERROR",0x10);
        _printf(&DAT_0053fee8);
        _printf("ASSERT : %4d, %s\n");
        _DAT_00000001 = 0xbadc0de;
      }
      piVar11 = (int *)thunk_FUN_00441310((undefined4 *)local_8[6]);
      local_30 = (**(code **)(*piVar11 + 200))();
      if ((**(float **)(param_3 + 4) < 0.0 != NAN(**(float **)(param_3 + 4))) ||
         (iVar13 = param_3, (float)local_30 < **(float **)(param_3 + 4))) {
        MessageBoxA((HWND)0x0,&DAT_0053ff34,"ERROR",0x10);
        _printf(&DAT_0053ff4c);
        _printf("ASSERT : %4d, %s\n");
        _DAT_00000001 = 0xbadc0de;
        iVar13 = extraout_EDX_01;
      }
      local_34 = 0;
      while (uVar17 = CONCAT44(iVar13,local_8), local_34 < (int)local_8[4]) {
        piVar11 = (int *)thunk_FUN_00441310((undefined4 *)((int)local_8[6] + local_34 * 4));
        FUN_004d0340(extraout_ECX_00,param_3);
        (**(code **)(*piVar11 + 0xcc))();
        iVar13 = local_34 + 1;
        local_34 = iVar13;
      }
      break;
    case 0x1a:
      iVar13 = thunk_FUN_00441310((undefined4 *)param_1[6]);
      if (iVar13 == 0) {
        MessageBoxA((HWND)0x0,&DAT_0053ff9c,"ERROR",0x10);
        _printf(&DAT_0053ffb0);
        _printf("ASSERT : %4d, %s\n");
        _DAT_00000001 = 0xbadc0de;
      }
      piVar11 = (int *)thunk_FUN_00441310((undefined4 *)local_8[6]);
      local_38 = (**(code **)(*piVar11 + 200))();
      if (**(float **)(param_3 + 4) < 0.0 == NAN(**(float **)(param_3 + 4))) {
        fVar20 = (float)local_38;
        fVar19 = **(float **)(param_3 + 4);
        iVar13 = CONCAT22(uVar25,(ushort)(fVar19 < fVar20) << 8 |
                                 (ushort)(NAN(fVar19) || NAN(fVar20)) << 10 |
                                 (ushort)(fVar19 == fVar20) << 0xe);
        if (fVar19 >= fVar20 && fVar19 != fVar20) goto LAB_00439013;
      }
      else {
LAB_00439013:
        MessageBoxA((HWND)0x0,&DAT_0053fffc,"ERROR",0x10);
        _printf(&DAT_00540014);
        iVar13 = _printf("ASSERT : %4d, %s\n");
        _DAT_00000001 = 0xbadc0de;
      }
      local_3c = 0;
      while (uVar17 = CONCAT44(local_3c,iVar13), local_3c < (int)local_8[4]) {
        piVar11 = (int *)thunk_FUN_00441310((undefined4 *)((int)local_8[6] + local_3c * 4));
        FUN_004d0340(*(undefined4 *)(param_3 + 4),extraout_EDX_02);
        (**(code **)(*piVar11 + 0xcc))();
        iVar13 = local_3c + 1;
        local_3c = iVar13;
      }
      break;
    case 0x1b:
      piVar11 = (int *)thunk_FUN_00441310((undefined4 *)param_1[6]);
      local_40 = (**(code **)(*piVar11 + 0xa4))();
      pfVar4 = *(float **)(param_3 + 4);
      if ((*pfVar4 < 0.0 != NAN(*pfVar4)) || ((float)local_40 <= **(float **)(param_3 + 4))) {
        MessageBoxA((HWND)0x0,&DAT_00540064,"ERROR",0x10);
        _printf(&DAT_0054007c);
        _printf("ASSERT : %4d, %s\n");
        _DAT_00000001 = 0xbadc0de;
        pfVar4 = extraout_EDX_03;
      }
      uVar17 = FUN_004d0340(*(undefined4 *)(param_3 + 4),pfVar4);
      local_8[0x48] = (void *)uVar17;
      piVar11 = (int *)thunk_FUN_00441310((undefined4 *)local_8[6]);
      piVar6 = (int *)thunk_FUN_00441310((undefined4 *)local_8[6]);
      (**(code **)(*piVar11 + 0xa8))();
      fVar16 = (float10)(**(code **)(*piVar6 + 0xa8))();
      thunk_FUN_004146a0(local_8 + 0x49,0,0,(float)fVar16,0x439203);
      for (local_44 = 0; local_44 < (int)local_8[4]; local_44 = local_44 + 1) {
        piVar11 = (int *)thunk_FUN_00441310((undefined4 *)((int)local_8[6] + local_44 * 4));
        thunk_FUN_00415ad0((int)(local_8 + 0x49));
        (**(code **)(*piVar11 + 0xb0))();
      }
      local_8[0x4f] = (void *)0x0;
      uVar17 = FUN_004d0340(local_8,param_3);
      local_8[0x50] = (void *)uVar17;
      break;
    case 0x1c:
      Selene::Math::Vector3D::Vector3D((Vector3D *)&local_54);
      bVar3 = thunk_FUN_00417750(local_8,0x80);
      if (bVar3) {
        local_54 = local_8[0x5d];
        local_50 = local_8[0x5e];
        local_4c = local_8[0x5f];
      }
      else {
        thunk_FUN_004415b0(local_8 + 0x17,local_264);
        pVVar9 = thunk_FUN_004415b0(local_8 + 10,local_258);
        ppvVar7 = (void **)Selene::Math::Vector3D::operator+(pVVar9);
        local_54 = *ppvVar7;
        local_50 = ppvVar7[1];
        local_4c = ppvVar7[2];
      }
      thunk_FUN_004163f0(*local_8,0);
      Selene::Math::Vector3D::operator-((Vector3D *)&local_54);
      fVar19 = Selene::Math::Vector3D::LengthSq(local_68);
      uVar18 = thunk_FUN_00418660(fVar19);
      fVar16 = (float10)**(float **)(param_3 + 4);
      uVar17 = CONCAT44((int)((ulonglong)uVar18 >> 0x20),
                        CONCAT22(uVar25,(ushort)(fVar16 < extraout_ST0) << 8 |
                                        (ushort)(NAN(fVar16) || NAN(extraout_ST0)) << 10 |
                                        (ushort)(fVar16 == extraout_ST0) << 0xe));
      if (fVar16 < extraout_ST0 != (NAN(fVar16) || NAN(extraout_ST0))) {
        uVar17 = thunk_FUN_004380e0(local_8);
      }
      break;
    case 0x1d:
      uVar28 = *(undefined4 *)(*(int *)(param_3 + 4) + 0xc);
      uVar1 = *(undefined4 *)(*(int *)(param_3 + 4) + 8);
      uVar26 = (undefined2)uVar1;
      uVar27 = (undefined2)((uint)uVar1 >> 0x10);
      uVar1 = *(undefined4 *)(*(int *)(param_3 + 4) + 4);
      VVar22 = SUB41(uVar1,0);
      uVar23 = (undefined)((uint)uVar1 >> 8);
      uVar25 = (undefined2)((uint)uVar1 >> 0x10);
      uVar17 = FUN_004d0340(*(int *)(param_3 + 4),param_3);
      thunk_FUN_004146a0(local_8 + 0xc1,(int)uVar17,CONCAT22(uVar25,CONCAT11(uVar23,VVar22)),
                         CONCAT22(uVar27,uVar26),uVar28);
      uVar28 = *(undefined4 *)(*(int *)(param_3 + 4) + 0x1c);
      uVar1 = *(undefined4 *)(*(int *)(param_3 + 4) + 0x18);
      uVar26 = (undefined2)uVar1;
      uVar27 = (undefined2)((uint)uVar1 >> 0x10);
      uVar1 = *(undefined4 *)(*(int *)(param_3 + 4) + 0x14);
      VVar22 = SUB41(uVar1,0);
      uVar23 = (undefined)((uint)uVar1 >> 8);
      uVar25 = (undefined2)((uint)uVar1 >> 0x10);
      uVar17 = FUN_004d0340(param_3,*(undefined4 *)(param_3 + 4));
      thunk_FUN_004146a0(local_8 + 199,(int)uVar17,CONCAT22(uVar25,CONCAT11(uVar23,VVar22)),
                         CONCAT22(uVar27,uVar26),uVar28);
      uVar28 = *(undefined4 *)(*(int *)(param_3 + 4) + 0x2c);
      uVar1 = *(undefined4 *)(*(int *)(param_3 + 4) + 0x28);
      uVar26 = (undefined2)uVar1;
      uVar27 = (undefined2)((uint)uVar1 >> 0x10);
      uVar1 = *(undefined4 *)(*(int *)(param_3 + 4) + 0x24);
      VVar22 = SUB41(uVar1,0);
      uVar23 = (undefined)((uint)uVar1 >> 8);
      uVar25 = (undefined2)((uint)uVar1 >> 0x10);
      uVar17 = FUN_004d0340(*(undefined4 *)(param_3 + 4),*(int *)(param_3 + 4));
      uVar17 = thunk_FUN_004146a0(local_8 + 0xcd,(int)uVar17,
                                  CONCAT22(uVar25,CONCAT11(uVar23,VVar22)),CONCAT22(uVar27,uVar26),
                                  uVar28);
      break;
    case 0x1e:
      uVar17 = thunk_FUN_004170f0(*param_1);
      break;
    case 0x1f:
      uVar17 = thunk_FUN_00441a90(*param_1);
      break;
    case 0x20:
      break;
    case 0x21:
      uVar17 = thunk_FUN_00417200(*param_1,4);
      break;
    case 0x22:
      thunk_FUN_00441500(param_1,0xe00,'\0');
      thunk_FUN_00441500(local_8,0x20,'\x01');
      thunk_FUN_00441600(local_8 + 0x17,**(float **)(param_3 + 4),
                         *(float *)(*(int *)(param_3 + 4) + 4),*(float *)(*(int *)(param_3 + 4) + 8)
                        );
      thunk_FUN_00414080(local_8 + 0x79,0,**(undefined4 **)(param_3 + 4),0);
      thunk_FUN_00414080(local_8 + 0x7f,0,*(undefined4 *)(*(int *)(param_3 + 4) + 4),0);
      uVar17 = thunk_FUN_00414080(local_8 + 0x85,0,*(undefined4 *)(*(int *)(param_3 + 4) + 8),0);
      break;
    case 0x23:
      uVar17 = CONCAT44(uVar15,uVar15);
      break;
    case 0x24:
      thunk_FUN_00441500(param_1,0x1200,'\x01');
      thunk_FUN_00441500(local_8,0x20,'\x01');
      uVar17 = thunk_FUN_004146a0(local_8 + 0x79,0,**(undefined4 **)(param_3 + 4),
                                  *(undefined4 *)(*(int *)(param_3 + 4) + 4),
                                  *(undefined4 *)(*(int *)(param_3 + 4) + 8));
      break;
    case 0x25:
      thunk_FUN_00441500(param_1,0x1400,'\x01');
      thunk_FUN_00441500(local_8,0x20,'\x01');
      uVar17 = thunk_FUN_004146a0(local_8 + 0x7f,0,**(undefined4 **)(param_3 + 4),
                                  *(undefined4 *)(*(int *)(param_3 + 4) + 4),
                                  *(undefined4 *)(*(int *)(param_3 + 4) + 8));
      break;
    case 0x26:
      thunk_FUN_00441500(param_1,0x1800,'\x01');
      thunk_FUN_00441500(local_8,0x20,'\x01');
      uVar17 = thunk_FUN_004146a0(local_8 + 0x85,0,**(undefined4 **)(param_3 + 4),
                                  *(undefined4 *)(*(int *)(param_3 + 4) + 4),
                                  *(undefined4 *)(*(int *)(param_3 + 4) + 8));
      break;
    case 0x27:
      uVar17 = thunk_FUN_004146a0(param_1 + 0xbb,0,**(undefined4 **)(param_3 + 4),
                                  *(undefined4 *)(*(int *)(param_3 + 4) + 4),
                                  *(undefined4 *)(*(int *)(param_3 + 4) + 8));
      break;
    case 0x28:
      thunk_FUN_00441500(param_1,0x2000,'\x01');
      uVar17 = thunk_FUN_004146a0(local_8 + 0xbb,0,**(undefined4 **)(param_3 + 4),
                                  *(undefined4 *)(*(int *)(param_3 + 4) + 4),
                                  *(undefined4 *)(*(int *)(param_3 + 4) + 8));
      break;
    case 0x29:
      uVar17 = FUN_004d0340(uVar14,param_3);
      local_70 = (undefined4)uVar17;
      local_74 = **(float **)(param_3 + 4);
      bVar3 = thunk_FUN_00417750(local_8,0x10000);
      if (bVar3) {
        local_74 = local_74 * -1.0;
      }
      thunk_FUN_0043b410(local_8,local_70,local_74,*(undefined4 *)(*(int *)(param_3 + 4) + 0xc));
      thunk_FUN_0043b470(local_8,local_70,*(undefined4 *)(*(int *)(param_3 + 4) + 4),
                         *(undefined4 *)(*(int *)(param_3 + 4) + 0xc));
      uVar17 = thunk_FUN_0043b4d0(local_8,local_70,*(undefined4 *)(*(int *)(param_3 + 4) + 8),
                                  *(undefined4 *)(*(int *)(param_3 + 4) + 0xc));
      break;
    case 0x2a:
      thunk_FUN_00441500(param_1,4,'\0');
      thunk_FUN_00441500(local_8,0x20,'\x01');
      pVVar9 = thunk_FUN_004415b0(local_8 + 10,local_27c);
      fVar19 = *(float *)(pVVar9 + 8);
      pVVar9 = thunk_FUN_004415b0(local_8 + 10,local_288);
      thunk_FUN_00441600(local_8 + 10,**(float **)(param_3 + 4),*(float *)(pVVar9 + 4),fVar19);
      uVar17 = thunk_FUN_00414080(local_8 + 0x67,0,**(undefined4 **)(param_3 + 4),0);
      break;
    case 0x2b:
      thunk_FUN_00441500(param_1,8,'\0');
      thunk_FUN_00441500(local_8,0x20,'\x01');
      pVVar9 = thunk_FUN_004415b0(local_8 + 10,local_294);
      fVar19 = *(float *)(pVVar9 + 8);
      uVar25 = (undefined2)**(undefined4 **)(param_3 + 4);
      uVar26 = (undefined2)((uint)**(undefined4 **)(param_3 + 4) >> 0x10);
      pfVar4 = (float *)thunk_FUN_004415b0(local_8 + 10,local_2a0);
      thunk_FUN_00441600(local_8 + 10,*pfVar4,(float)CONCAT22(uVar26,uVar25),fVar19);
      uVar17 = thunk_FUN_00414080(local_8 + 0x6d,0,**(undefined4 **)(param_3 + 4),0);
      break;
    case 0x2c:
      thunk_FUN_00441500(param_1,0x10,'\0');
      thunk_FUN_00441500(local_8,0x20,'\x01');
      fVar19 = **(float **)(param_3 + 4);
      pVVar9 = thunk_FUN_004415b0(local_8 + 10,local_2ac);
      uVar25 = (undefined2)*(undefined4 *)(pVVar9 + 4);
      uVar26 = (undefined2)((uint)*(undefined4 *)(pVVar9 + 4) >> 0x10);
      pfVar4 = (float *)thunk_FUN_004415b0(local_8 + 10,local_2b8);
      thunk_FUN_00441600(local_8 + 10,*pfVar4,(float)CONCAT22(uVar26,uVar25),fVar19);
      uVar17 = thunk_FUN_00414080(local_8 + 0x73,0,**(undefined4 **)(param_3 + 4),0);
      break;
    case 0x2d:
      uVar17 = FUN_004d0340(param_3,*(undefined4 *)(param_3 + 4));
      local_80 = thunk_FUN_00440640(local_8[1],(int)uVar17);
      iVar13 = (**(code **)(**(int **)(local_80 + 4) + 0x24))();
      if (iVar13 != 0) {
        (**(code **)(**(int **)(local_80 + 4) + 0x14))();
      }
      (**(code **)(**(int **)(local_80 + 4) + 0x10))();
      uVar17 = thunk_FUN_00432f30((char *)(local_80 + 8));
      break;
    case 0x2e:
      param_1[0x55] = (void *)0x0;
      param_1[0x56] = (void *)0x3f800000;
      param_1[0x57] = (void *)0x0;
      param_1[0x58] = (void *)0x0;
      uVar17 = CONCAT44(param_1,param_1);
      break;
    case 0x37:
      uVar17 = thunk_FUN_00441500(param_1,0x4000,'\x01');
      break;
    case 0x5b:
      uVar17 = thunk_FUN_00441500(param_1,0x10000,'\x01');
      break;
    case 0x5c:
      uVar17 = FUN_004d0340(uVar14,param_3);
      bVar3 = thunk_FUN_00491be0(*local_8,(int)uVar17);
      if (bVar3 == 0) {
        uVar17 = FUN_004d0340(*(undefined4 *)(param_3 + 4),0);
        pvVar5 = (void *)uVar17;
        local_8[100] = pvVar5;
      }
      else {
        uVar17 = FUN_004d0340(*(undefined4 *)(param_3 + 4),(uint)bVar3);
        pvVar5 = (void *)uVar17;
        local_8[100] = pvVar5;
      }
      uVar17 = CONCAT44(local_8,pvVar5);
      break;
    case 0x5d:
      uVar28 = *(undefined4 *)(*(int *)(param_3 + 4) + 0xc);
      uVar1 = *(undefined4 *)(*(int *)(param_3 + 4) + 8);
      uVar26 = (undefined2)uVar1;
      uVar27 = (undefined2)((uint)uVar1 >> 0x10);
      uVar1 = *(undefined4 *)(*(int *)(param_3 + 4) + 4);
      VVar22 = SUB41(uVar1,0);
      uVar23 = (undefined)((uint)uVar1 >> 8);
      uVar25 = (undefined2)((uint)uVar1 >> 0x10);
      uVar17 = FUN_004d0340(*(undefined4 *)(param_3 + 4),*(int *)(param_3 + 4));
      uVar17 = thunk_FUN_00435a80(local_8 + 0x8b,(int)uVar17,
                                  CONCAT22(uVar25,CONCAT11(uVar23,VVar22)),CONCAT22(uVar27,uVar26),
                                  uVar28);
      break;
    case 0x5e:
      uVar28 = *(undefined4 *)(*(int *)(param_3 + 4) + 0xc);
      uVar1 = *(undefined4 *)(*(int *)(param_3 + 4) + 8);
      uVar26 = (undefined2)uVar1;
      uVar27 = (undefined2)((uint)uVar1 >> 0x10);
      uVar1 = *(undefined4 *)(*(int *)(param_3 + 4) + 4);
      VVar22 = SUB41(uVar1,0);
      uVar23 = (undefined)((uint)uVar1 >> 8);
      uVar25 = (undefined2)((uint)uVar1 >> 0x10);
      uVar17 = FUN_004d0340(*(int *)(param_3 + 4),param_3);
      uVar17 = thunk_FUN_00435ac0(local_8 + 0x8b,(int)uVar17,
                                  CONCAT22(uVar25,CONCAT11(uVar23,VVar22)),CONCAT22(uVar27,uVar26),
                                  uVar28);
      break;
    case 0x5f:
      uVar28 = *(undefined4 *)(*(int *)(param_3 + 4) + 0xc);
      uVar1 = *(undefined4 *)(*(int *)(param_3 + 4) + 8);
      uVar26 = (undefined2)uVar1;
      uVar27 = (undefined2)((uint)uVar1 >> 0x10);
      uVar1 = *(undefined4 *)(*(int *)(param_3 + 4) + 4);
      VVar22 = SUB41(uVar1,0);
      uVar23 = (undefined)((uint)uVar1 >> 8);
      uVar25 = (undefined2)((uint)uVar1 >> 0x10);
      uVar17 = FUN_004d0340(param_3,*(undefined4 *)(param_3 + 4));
      uVar17 = thunk_FUN_00435b10(local_8 + 0x8b,(int)uVar17,
                                  CONCAT22(uVar25,CONCAT11(uVar23,VVar22)),CONCAT22(uVar27,uVar26),
                                  uVar28);
      break;
    case 0x60:
      uVar28 = *(undefined4 *)(*(int *)(param_3 + 4) + 0x1c);
      uVar1 = *(undefined4 *)(*(int *)(param_3 + 4) + 0x10);
      uVar26 = (undefined2)uVar1;
      uVar27 = (undefined2)((uint)uVar1 >> 0x10);
      uVar1 = *(undefined4 *)(*(int *)(param_3 + 4) + 4);
      VVar22 = SUB41(uVar1,0);
      uVar23 = (undefined)((uint)uVar1 >> 8);
      uVar25 = (undefined2)((uint)uVar1 >> 0x10);
      uVar17 = FUN_004d0340(*(undefined4 *)(param_3 + 4),*(int *)(param_3 + 4));
      thunk_FUN_00435a80(local_8 + 0x8b,(int)uVar17,CONCAT22(uVar25,CONCAT11(uVar23,VVar22)),
                         CONCAT22(uVar27,uVar26),uVar28);
      uVar28 = *(undefined4 *)(*(int *)(param_3 + 4) + 0x1c);
      uVar1 = *(undefined4 *)(*(int *)(param_3 + 4) + 0x14);
      uVar26 = (undefined2)uVar1;
      uVar27 = (undefined2)((uint)uVar1 >> 0x10);
      uVar1 = *(undefined4 *)(*(int *)(param_3 + 4) + 8);
      VVar22 = SUB41(uVar1,0);
      uVar23 = (undefined)((uint)uVar1 >> 8);
      uVar25 = (undefined2)((uint)uVar1 >> 0x10);
      uVar17 = FUN_004d0340(*(int *)(param_3 + 4),param_3);
      thunk_FUN_00435ac0(local_8 + 0x8b,(int)uVar17,CONCAT22(uVar25,CONCAT11(uVar23,VVar22)),
                         CONCAT22(uVar27,uVar26),uVar28);
      uVar28 = *(undefined4 *)(*(int *)(param_3 + 4) + 0x1c);
      uVar1 = *(undefined4 *)(*(int *)(param_3 + 4) + 0x18);
      uVar26 = (undefined2)uVar1;
      uVar27 = (undefined2)((uint)uVar1 >> 0x10);
      uVar1 = *(undefined4 *)(*(int *)(param_3 + 4) + 0xc);
      VVar22 = SUB41(uVar1,0);
      uVar23 = (undefined)((uint)uVar1 >> 8);
      uVar25 = (undefined2)((uint)uVar1 >> 0x10);
      uVar17 = FUN_004d0340(param_3,*(undefined4 *)(param_3 + 4));
      uVar17 = thunk_FUN_00435b10(local_8 + 0x8b,(int)uVar17,
                                  CONCAT22(uVar25,CONCAT11(uVar23,VVar22)),CONCAT22(uVar27,uVar26),
                                  uVar28);
      break;
    case 0x61:
      if (NAN(**(float **)(param_3 + 4)) == (**(float **)(param_3 + 4) == 0.0)) {
        uVar17 = thunk_FUN_00441500(param_1,0x20000,'\x01');
      }
      else {
        uVar17 = thunk_FUN_00441500(param_1,0x20000,'\0');
      }
      break;
    case 0x62:
      uVar17 = FUN_004d0340(uVar14,param_3);
      local_78 = (undefined4)uVar17;
      local_7c = **(float **)(param_3 + 4);
      bVar3 = thunk_FUN_00417750(local_8,0x10000);
      if (bVar3) {
        local_7c = local_7c * -1.0;
      }
      uVar17 = thunk_FUN_0043b410(local_8,local_78,local_7c,
                                  *(undefined4 *)(*(int *)(param_3 + 4) + 4));
      break;
    case 99:
      uVar28 = *(undefined4 *)(*(int *)(param_3 + 4) + 4);
      uVar1 = **(undefined4 **)(param_3 + 4);
      uVar25 = (undefined2)uVar1;
      uVar26 = (undefined2)((uint)uVar1 >> 0x10);
      uVar17 = FUN_004d0340(*(undefined4 **)(param_3 + 4),param_3);
      uVar17 = thunk_FUN_0043b470(local_8,(int)uVar17,CONCAT22(uVar26,uVar25),uVar28);
      break;
    case 100:
      uVar28 = *(undefined4 *)(*(int *)(param_3 + 4) + 4);
      uVar1 = **(undefined4 **)(param_3 + 4);
      uVar25 = (undefined2)uVar1;
      uVar26 = (undefined2)((uint)uVar1 >> 0x10);
      uVar17 = FUN_004d0340(*(undefined4 **)(param_3 + 4),param_3);
      uVar17 = thunk_FUN_0043b4d0(local_8,(int)uVar17,CONCAT22(uVar26,uVar25),uVar28);
      break;
    case 0x65:
      if (NAN(**(float **)(param_3 + 4)) == (**(float **)(param_3 + 4) == 1.0)) {
        uVar17 = thunk_FUN_00441500(param_1,0x40000,'\0');
      }
      else {
        uVar17 = thunk_FUN_00441500(param_1,0x40000,'\x01');
      }
      break;
    case 0x66:
      if (NAN(**(float **)(param_3 + 4)) == (**(float **)(param_3 + 4) == 1.0)) {
        uVar17 = thunk_FUN_00417260(*param_1,'\0');
      }
      else {
        uVar17 = thunk_FUN_00417260(*param_1,'\x01');
      }
      break;
    case 0x67:
      bVar3 = thunk_FUN_00441b50(*param_1);
      uVar17 = (ulonglong)CONCAT14(bVar3,CONCAT31(extraout_var,bVar3));
      if (bVar3) {
        uVar17 = FUN_004d0340(*(undefined4 *)(param_3 + 4),(uint)bVar3);
        uVar15 = (uint)uVar17 & 0xffff;
        uVar17 = FUN_004d0340(*(undefined4 *)(param_3 + 4),uVar15);
        thunk_FUN_00441a50(local_8 + 99,(short)uVar17,(short)uVar15);
        local_8[0x61] = (void *)0x0;
        uVar17 = FUN_004d0340(local_8,extraout_EDX_04);
        uVar17 = thunk_FUN_004381c0(local_8,(void **)(uVar17 >> 0x20),(int)uVar17);
      }
      break;
    case 0x7c:
      Selene::Collision::CBox::CBox(local_164);
      Selene::Math::Matrix::Matrix(local_1ac);
      Selene::Math::Matrix::Identity(local_1ac);
      pMVar8 = (Matrix *)
               Selene::Math::Vector3D::Vector3D
                         (local_2c4,**(float **)(param_3 + 4),*(float *)(*(int *)(param_3 + 4) + 4),
                          *(float *)(*(int *)(param_3 + 4) + 8));
      uVar28 = 0x439ef7;
      pVVar9 = (Vector3D *)
               Selene::Math::Vector3D::Vector3D
                         (local_2d0,-**(float **)(param_3 + 4),
                          -*(float *)(*(int *)(param_3 + 4) + 4),
                          -*(float *)(*(int *)(param_3 + 4) + 8));
      Selene::Collision::CBox::CreateBox(local_164,pVVar9,(Vector3D *)0x439f39,pMVar8);
      bVar3 = thunk_FUN_00417750(local_8,0x80);
      if (bVar3) {
        Selene::Collision::CBox::Transform(local_164,(Matrix *)(local_8 + 0x51));
      }
      else {
        Selene::Math::Matrix::Identity(local_1ac);
        pVVar9 = thunk_FUN_004415b0(local_8 + 10,local_2dc);
        fVar19 = *(float *)(pVVar9 + 8);
        pVVar9 = thunk_FUN_004415b0(local_8 + 10,local_2e8);
        fVar20 = *(float *)(pVVar9 + 4);
        pfVar4 = (float *)thunk_FUN_004415b0(local_8 + 10,local_2f4);
        Selene::Math::Matrix::Translation(local_1ac,*pfVar4,fVar20,fVar19);
        Selene::Collision::CBox::Transform(local_164,local_1ac);
      }
      local_1b8[0] = 0.0;
      local_1c4[0] = 0.0;
      local_1d0 = -1;
      local_1d8 = 0;
      while( true ) {
        iVar13 = thunk_FUN_00416c80((int)*local_8);
        uVar17 = CONCAT44(extraout_EDX_05,iVar13);
        if (iVar13 <= local_1d8) break;
        VVar22 = SUB41(local_1c4,0);
        uVar24 = (undefined)((uint)local_1c4 >> 8);
        uVar25 = (undefined2)((uint)local_1c4 >> 0x10);
        pfVar4 = local_1b8;
        Selene::Collision::CBox::CBox((CBox *)&stack0xfffffb60,local_164);
        uVar23 = 0x93;
        iVar13 = local_1d8;
        iVar10 = thunk_FUN_00417450(*local_8,0);
        pvVar5 = (void *)thunk_FUN_00425830(*(void **)(iVar10 + 8),iVar13);
        uVar17 = thunk_FUN_004b41e0(pvVar5,uVar23,in_stack_fffffb60,in_stack_fffffb64,
                                    in_stack_fffffb68,in_stack_fffffb6c,in_stack_fffffb70,
                                    in_stack_fffffb74,in_stack_fffffb78,in_stack_fffffb7c,uVar28,
                                    pfVar4,CONCAT22(uVar25,CONCAT11(uVar24,VVar22)));
        if ((uVar17 & 0xff) != 0) {
          uVar17 = FUN_004d0340(*(undefined4 *)(param_3 + 4),(uint)uVar17 & 0xff);
          uVar15 = (uint)uVar17 & 0xffff;
          VVar22 = SUB41(uVar15,0);
          uVar23 = (undefined)(uVar15 >> 8);
          uVar17 = FUN_004d0340(*(undefined4 *)(param_3 + 4),uVar15);
          thunk_FUN_00438050(local_8,(uint)uVar17 & 0xffff,(short)uVar17,CONCAT11(uVar23,VVar22));
          fVar16 = thunk_FUN_00415e00(extraout_ECX_04,local_1c4[0]);
          local_1dc = (float)(fVar16 * (float10)local_1b8[0]);
          fVar16 = thunk_FUN_00415dc0(extraout_ECX_05,local_1c4[0]);
          local_1e0 = (float)(fVar16 * (float10)local_1b8[0]);
          thunk_FUN_00435390(local_8 + 10,local_1dc);
          thunk_FUN_00435410(local_8 + 10,local_1e0);
          uVar17 = FUN_004d0340(*(undefined4 *)(param_3 + 4),extraout_EDX_06);
          if ((int)uVar17 == 3) {
            VVar22 = (Vector3D)0x1;
            uVar15 = 0x40000000;
            iVar13 = local_1d8;
            iVar10 = local_1d0;
            iVar21 = thunk_FUN_00417450(*local_8,0);
            pvVar5 = (void *)thunk_FUN_00425830(*(void **)(iVar21 + 8),iVar13);
            pvVar5 = (void *)thunk_FUN_00418940(pvVar5,iVar10);
            uVar17 = thunk_FUN_0042a4d0(pvVar5,uVar15,(char)VVar22);
          }
          else if ((int)uVar17 == 4) {
            iVar21 = 0;
            iVar13 = local_1d8;
            iVar10 = thunk_FUN_00417450(*local_8,0);
            pvVar5 = (void *)thunk_FUN_00425830(*(void **)(iVar10 + 8),iVar13);
            thunk_FUN_004b4690(pvVar5,extraout_EDX_07,iVar21);
            VVar22 = (Vector3D)0x1;
            uVar15 = 0x40000000;
            iVar13 = local_1d8;
            iVar10 = local_1d0;
            iVar21 = thunk_FUN_00417450(*local_8,0);
            pvVar5 = (void *)thunk_FUN_00425830(*(void **)(iVar21 + 8),iVar13);
            pvVar5 = (void *)thunk_FUN_00418940(pvVar5,iVar10);
            uVar17 = thunk_FUN_0042a4d0(pvVar5,uVar15,(char)VVar22);
          }
          break;
        }
        local_1d8 = local_1d8 + 1;
      }
      break;
    case 0x7f:
      thunk_FUN_00441500(param_1,0x2000,'\x01');
      thunk_FUN_004165a0((int)*local_8);
      piVar11 = (int *)thunk_FUN_0042ee00();
      fVar16 = (float10)(**(code **)(*piVar11 + 0x18))();
      local_1e4 = (float)fVar16;
      thunk_FUN_004165a0((int)*local_8);
      piVar11 = (int *)thunk_FUN_0042ee00();
      fVar16 = (float10)(**(code **)(*piVar11 + 0x18))();
      uVar17 = thunk_FUN_004146a0(local_8 + 0x24,0,local_1e4,local_1e4 + 360.0,(float)fVar16);
      break;
    case 0x80:
      thunk_FUN_00441500(param_1,0x1c,'\0');
      thunk_FUN_00441500(local_8,0x20,'\x01');
      Selene::Math::Vector3D::Vector3D((Vector3D *)&local_200);
      thunk_FUN_004165a0((int)*local_8);
      piVar11 = (int *)thunk_FUN_0042ee00();
      uVar28 = *(undefined4 *)(*(int *)(param_3 + 4) + 0xc);
      uVar25 = (undefined2)uVar28;
      uVar26 = (undefined2)((uint)uVar28 >> 0x10);
      fVar16 = (float10)(**(code **)(*piVar11 + 0x18))();
      local_208 = (float)fVar16;
      thunk_FUN_004165a0((int)*local_8);
      piVar11 = (int *)thunk_FUN_0042ee00();
      fVar16 = (float10)(**(code **)(*piVar11 + 0x18))();
      local_20c = (float)fVar16;
      local_210 = 0.0;
      Selene::Math::Vector3D::Vector3D((Vector3D *)&local_220,0.0,0.0,0.0);
      bVar3 = thunk_FUN_00417750(local_8,0x80);
      if (bVar3) {
        puVar12 = (undefined4 *)
                  Selene::Math::Vector3D::Vector3D
                            (local_310,(float)local_8[0x5d],(float)local_8[0x5e],
                             (float)local_8[0x5f]);
        local_200 = *puVar12;
        local_1fc = (void *)puVar12[1];
        local_1f8 = puVar12[2];
        thunk_FUN_00441500(local_8,0x80,'\0');
        pvVar5 = extraout_ECX_06;
      }
      else {
        puVar12 = (undefined4 *)thunk_FUN_004415b0(local_8 + 10,local_31c);
        local_200 = *puVar12;
        pvVar5 = (void *)puVar12[1];
        local_1f8 = puVar12[2];
        local_1fc = pvVar5;
      }
      local_20c = (local_20c * 6.283185) / 360.0;
      fVar16 = thunk_FUN_00415e00(pvVar5,local_20c);
      local_220 = (float)(fVar16 * (float10)local_208);
      thunk_FUN_004165a0((int)*local_8);
      piVar11 = (int *)thunk_FUN_0042ee00();
      fVar16 = (float10)(**(code **)(*piVar11 + 0x18))();
      local_21c = (float)fVar16;
      local_210 = (local_21c * *(float *)((int)*(void **)(param_3 + 4) + 0x18)) / 100.0;
      uVar28 = 0x43a806;
      fVar16 = thunk_FUN_00415dc0(*(void **)(param_3 + 4),local_20c);
      local_218 = (float)(fVar16 * (float10)local_208);
      Selene::Math::Vector3D::Vector3D((Vector3D *)&stack0xfffffc40,(Vector3D *)&local_200);
      thunk_FUN_00441740(local_8 + 10,0x43a830,CONCAT22(uVar26,uVar25),uVar28);
      Selene::Math::Vector3D::Vector3D((Vector3D *)&stack0xfffffc3c,(Vector3D *)&local_220);
      thunk_FUN_00435330((int)(local_8 + 10),extraout_DL,0x56);
      thunk_FUN_00435450(local_8 + 10,local_210);
      thunk_FUN_00414080(local_8 + 0x67,0,local_200,0);
      thunk_FUN_00414080(local_8 + 0x6d,0,local_1fc,0);
      uVar17 = thunk_FUN_00414080(local_8 + 0x73,0,local_1f8,0);
      break;
    case 0x81:
      Selene::Math::Vector3D::Vector3D((Vector3D *)&local_234);
      bVar3 = thunk_FUN_00417750(local_8,0x80);
      if (bVar3) {
        puVar12 = (undefined4 *)
                  Selene::Math::Vector3D::Vector3D
                            (local_330,(float)local_8[0x5d],(float)local_8[0x5e],
                             (float)local_8[0x5f]);
        local_234 = *puVar12;
        local_230 = puVar12[1];
        local_22c = puVar12[2];
      }
      else {
        puVar12 = (undefined4 *)thunk_FUN_004415b0(local_8 + 10,local_33c);
        local_234 = *puVar12;
        local_230 = puVar12[1];
        local_22c = puVar12[2];
      }
      Selene::Math::Vector3D::Vector3D
                (local_34c,*(float *)(*(int *)(param_3 + 4) + 8),
                 *(float *)(*(int *)(param_3 + 4) + 0xc),*(float *)(*(int *)(param_3 + 4) + 0x10));
      Selene::Math::Vector3D::operator+((Vector3D *)&local_234);
      uVar17 = FUN_004d0340(extraout_ECX_07,param_3);
      FUN_004d0340((uint)uVar17 & 0xffff,param_3);
      local_23c = thunk_FUN_0043bdc0(local_8[2],0);
      fVar19 = *(float *)(*(int *)(param_3 + 4) + 0x14);
      uVar17 = CONCAT44(extraout_EDX_08,
                        CONCAT22(uVar25,(ushort)(fVar19 < 0.0) << 8 | (ushort)NAN(fVar19) << 10 |
                                        (ushort)(fVar19 == 0.0) << 0xe));
      if (NAN(fVar19) == (fVar19 == 0.0)) {
        Selene::Math::Vector3D::Vector3D((Vector3D *)&stack0xfffffc3c,(Vector3D *)(local_8 + 0xd));
        uVar17 = thunk_FUN_0043c1a0(local_8[2],local_23c);
      }
      break;
    case 0x82:
      uVar17 = FUN_004d0340(uVar14,param_3);
      iVar13 = (int)uVar17;
      pvVar5 = (void *)thunk_FUN_00417570((int)*local_8);
      uVar15 = thunk_FUN_00411c00(pvVar5,iVar13);
      uVar17 = CONCAT44(uVar15,uVar15) & 0xffffffffff;
      if ((uVar15 & 0xff) == 0) {
        uVar17 = FUN_004d0340(*(undefined4 *)(param_3 + 4),0);
        iVar13 = (int)uVar17;
        pvVar5 = (void *)thunk_FUN_00417570((int)*local_8);
        uVar17 = thunk_FUN_00411b40(pvVar5,iVar13);
      }
      break;
    case 0x83:
      thunk_FUN_004165a0((int)*param_1);
      piVar11 = (int *)thunk_FUN_0042ee00();
      FUN_004d0340(*(undefined4 *)(param_3 + 4),extraout_EDX_00);
      FUN_004d0340(extraout_ECX,param_3);
      pvVar5 = (void *)(**(code **)(*piVar11 + 0x14))();
      uVar17 = thunk_FUN_0043adc0(local_8,pvVar5);
      break;
    case 0x84:
      uVar17 = FUN_004d0340(param_3,*(undefined4 *)(param_3 + 4));
      local_2c = (void *)((int)uVar17 + (int)local_8[5]);
      uVar17 = thunk_FUN_0043adc0(local_8,local_2c);
      break;
    case 0x85:
      thunk_FUN_00441500(param_1,0x1c,'\0');
      thunk_FUN_00441500(local_8,0x20,'\x01');
      thunk_FUN_004415b0(local_8 + 10,(Vector3D *)&local_1c);
      bVar3 = thunk_FUN_00417750(local_8,0x80);
      if (bVar3) {
        thunk_FUN_00441500(local_8,0x80,'\0');
        pfVar4 = (float *)Selene::Math::Vector3D::Vector3D
                                    (local_248,(float)local_8[0x5d],(float)local_8[0x5e],
                                     (float)local_8[0x5f]);
        local_1c = *pfVar4;
        local_18 = pfVar4[1];
        local_14 = pfVar4[2];
      }
      thunk_FUN_004165a0((int)*local_8);
      piVar11 = (int *)thunk_FUN_0042ee00();
      uVar28 = *(undefined4 *)(*(int *)(param_3 + 4) + 4);
      uVar26 = (undefined2)uVar28;
      uVar27 = (undefined2)((uint)uVar28 >> 0x10);
      uVar28 = **(undefined4 **)(param_3 + 4);
      VVar22 = SUB41(uVar28,0);
      uVar23 = (undefined)((uint)uVar28 >> 8);
      uVar25 = (undefined2)((uint)uVar28 >> 0x10);
      fVar16 = (float10)(**(code **)(*piVar11 + 0x18))();
      local_24 = (float)fVar16;
      bVar3 = thunk_FUN_00417750(local_8,0x10000);
      if (bVar3) {
        local_24 = local_24 * -1.0;
      }
      local_1c = local_1c + local_24;
      thunk_FUN_004165a0((int)*local_8);
      piVar11 = (int *)thunk_FUN_0042ee00();
      fVar16 = (float10)(**(code **)(*piVar11 + 0x18))();
      local_18 = (float)(fVar16 + (float10)local_18);
      thunk_FUN_004165a0((int)*local_8);
      piVar11 = (int *)thunk_FUN_0042ee00();
      fVar16 = (float10)(**(code **)(*piVar11 + 0x18))();
      local_14 = (float)(fVar16 + (float10)local_14);
      Selene::Math::Vector3D::Vector3D((Vector3D *)&stack0xfffffc3c,(Vector3D *)&local_1c);
      thunk_FUN_00441740(local_8 + 10,0x438791,CONCAT22(uVar25,CONCAT11(uVar23,VVar22)),
                         CONCAT22(uVar27,uVar26));
      thunk_FUN_00414080(local_8 + 0x67,0,local_1c,0);
      thunk_FUN_00414080(local_8 + 0x6d,0,local_18,0);
      uVar17 = thunk_FUN_00414080(local_8 + 0x73,0,local_14,0);
      break;
    case 0x86:
      thunk_FUN_004165a0((int)*param_1);
      piVar11 = (int *)thunk_FUN_0042ee00();
      FUN_004d0340(extraout_ECX_01,param_3);
      FUN_004d0340(param_3,*(undefined4 *)(param_3 + 4));
      local_84 = (**(code **)(*piVar11 + 0x14))();
      local_88 = thunk_FUN_00440640(local_8[1],local_84);
      iVar13 = (**(code **)(**(int **)(local_88 + 4) + 0x24))();
      if (iVar13 != 0) {
        (**(code **)(**(int **)(local_88 + 4) + 0x14))();
      }
      (**(code **)(**(int **)(local_88 + 4) + 0x10))();
      uVar17 = thunk_FUN_00432f30((char *)(local_88 + 8));
      break;
    case 0x87:
      bVar3 = thunk_FUN_00417750(param_1,0x80);
      if (bVar3) {
        uVar26 = 0x80;
        uVar27 = 0;
        VVar22 = (Vector3D)0x2e;
        uVar23 = 0xa3;
        uVar25 = 0x43;
        thunk_FUN_00441500(local_8,0x80,'\0');
        Selene::Math::Vector3D::Vector3D
                  ((Vector3D *)&stack0xfffffc3c,(float)local_8[0x5d],(float)local_8[0x5e],
                   (float)local_8[0x5f]);
        thunk_FUN_00441740(local_8 + 10,0x43a369,CONCAT22(uVar25,CONCAT11(uVar23,VVar22)),
                           CONCAT22(uVar27,uVar26));
      }
      thunk_FUN_004165a0((int)*local_8);
      piVar11 = (int *)thunk_FUN_0042ee00();
      fVar16 = (float10)(**(code **)(*piVar11 + 0x18))();
      local_1e8 = (float)fVar16;
      uVar17 = thunk_FUN_00414080(local_8 + 0x24,0,local_1e8,0);
      break;
    case 0x88:
      bVar3 = thunk_FUN_00417750(param_1,0x80);
      if (bVar3) {
        uVar26 = 0x80;
        uVar27 = 0;
        VVar22 = (Vector3D)0xe;
        uVar23 = 0xa4;
        uVar25 = 0x43;
        thunk_FUN_00441500(local_8,0x80,'\0');
        Selene::Math::Vector3D::Vector3D
                  ((Vector3D *)&stack0xfffffc3c,(float)local_8[0x5d],(float)local_8[0x5e],
                   (float)local_8[0x5f]);
        thunk_FUN_00441740(local_8 + 10,0x43a449,CONCAT22(uVar25,CONCAT11(uVar23,VVar22)),
                           CONCAT22(uVar27,uVar26));
      }
      thunk_FUN_004165a0((int)*local_8);
      piVar11 = (int *)thunk_FUN_0042ee00();
      fVar16 = (float10)(**(code **)(*piVar11 + 0x18))();
      local_1ec = (float)fVar16;
      uVar17 = thunk_FUN_00414080(local_8 + 0x2a,0,local_1ec,0);
      break;
    case 0x89:
      bVar3 = thunk_FUN_00417750(param_1,0x80);
      if (bVar3) {
        uVar26 = 0x80;
        uVar27 = 0;
        VVar22 = (Vector3D)0xee;
        uVar23 = 0xa4;
        uVar25 = 0x43;
        thunk_FUN_00441500(local_8,0x80,'\0');
        Selene::Math::Vector3D::Vector3D
                  ((Vector3D *)&stack0xfffffc3c,(float)local_8[0x5d],(float)local_8[0x5e],
                   (float)local_8[0x5f]);
        thunk_FUN_00441740(local_8 + 10,0x43a529,CONCAT22(uVar25,CONCAT11(uVar23,VVar22)),
                           CONCAT22(uVar27,uVar26));
      }
      thunk_FUN_004165a0((int)*local_8);
      piVar11 = (int *)thunk_FUN_0042ee00();
      fVar16 = (float10)(**(code **)(*piVar11 + 0x18))();
      local_1f0 = (float)fVar16;
      uVar17 = thunk_FUN_00414080(local_8 + 0x30,0,local_1f0,0);
      break;
    case 0x90:
      uVar17 = FUN_004d0340(*(undefined4 *)(param_3 + 4),uVar15);
      cVar2 = thunk_FUN_00491c40(*local_8,(int)uVar17);
      if (cVar2 == '\0') {
        uVar17 = FUN_004d0340(extraout_ECX_02,param_3);
        local_8[100] = (void *)uVar17;
      }
      else {
        uVar17 = FUN_004d0340(param_3,*(undefined4 *)(param_3 + 4));
        local_8[100] = (void *)uVar17;
      }
      break;
    case 0x91:
      uVar17 = FUN_004d0340(uVar14,param_3);
      uVar15 = thunk_FUN_00491c80(*local_8,(int)uVar17);
      if ((uVar15 & 0xff) == 0) {
        uVar17 = FUN_004d0340(*(undefined4 *)(param_3 + 4),0);
        pvVar5 = (void *)uVar17;
        local_8[100] = pvVar5;
      }
      else {
        uVar17 = FUN_004d0340(*(undefined4 *)(param_3 + 4),uVar15 & 0xff);
        pvVar5 = (void *)uVar17;
        local_8[100] = pvVar5;
      }
      uVar17 = CONCAT44(local_8,pvVar5);
      break;
    case 0xb4:
      uVar17 = FUN_004d0340(*(undefined4 *)(param_3 + 4),uVar15);
      cVar2 = thunk_FUN_00491cc0(*local_8,(int)uVar17);
      if (cVar2 == '\0') {
        uVar17 = FUN_004d0340(extraout_ECX_03,param_3);
        local_8[100] = (void *)uVar17;
      }
      else {
        uVar17 = FUN_004d0340(param_3,*(undefined4 *)(param_3 + 4));
        local_8[100] = (void *)uVar17;
      }
      break;
    case 0xb5:
      uVar17 = FUN_004d0340(param_3,*(undefined4 *)(param_3 + 4));
      if ((int)uVar17 < 0) {
LAB_00438474:
        MessageBoxA((HWND)0x0,&DAT_0053fe3c,"ERROR",0x10);
        _printf(&DAT_0053fe44);
        _printf("ASSERT : %4d, %s\n");
        _DAT_00000001 = 0xbadc0de;
        uVar28 = extraout_EDX;
      }
      else {
        uVar17 = FUN_004d0340(*(undefined4 *)(param_3 + 4),(int)(uVar17 >> 0x20));
        uVar28 = (undefined4)(uVar17 >> 0x20);
        if (6 < (int)uVar17) goto LAB_00438474;
      }
      uVar17 = FUN_004d0340(*(undefined4 *)(param_3 + 4),uVar28);
      local_8[0x65] = (void *)uVar17;
      uVar17 = CONCAT44(local_8,(void *)uVar17);
      break;
    case 0xb6:
      thunk_FUN_00414080(param_1 + 0xc1,0,**(undefined4 **)(param_3 + 4),
                         *(undefined4 *)(*(int *)(param_3 + 4) + 8));
      uVar17 = thunk_FUN_00414080(local_8 + 199,0,*(undefined4 *)(*(int *)(param_3 + 4) + 4),
                                  *(undefined4 *)(*(int *)(param_3 + 4) + 8));
    }
  }
  else {
LAB_0043aaad:
    MessageBoxA((HWND)0x0,&DAT_005400cc,"ERROR",0x10);
    _printf(&DAT_005400e4);
    iVar13 = _printf("ASSERT : %4d, %s\n");
    _DAT_00000001 = 0xbadc0de;
    uVar17 = CONCAT44(extraout_EDX_09,iVar13);
  }
LAB_0043aaf8:
  uVar26 = (undefined2)(uVar17 >> 0x20);
  uVar27 = (undefined2)(uVar17 >> 0x30);
  VVar22 = SUB81(uVar17,0);
  uVar23 = (undefined)(uVar17 >> 8);
  uVar25 = (undefined2)(uVar17 >> 0x10);
  __RTC_CheckStackVars_8((int)&stack0xfffffffc,(int *)&DAT_0043ab20);
  return CONCAT26(uVar27,CONCAT24(uVar26,CONCAT22(uVar25,CONCAT11(uVar23,VVar22))));
}

